import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = {
  success: boolean;
};

type RateLimiter = {
  limit: (key: string) => Promise<RateLimitResult>;
};

const IP_LIMIT = 8;
const EMAIL_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1_000;

class MemoryRateLimiter implements RateLimiter {
  private store = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number,
  ) {}

  async limit(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return { success: true };
    }

    if (entry.count >= this.maxRequests) {
      return { success: false };
    }

    entry.count += 1;
    this.store.set(key, entry);
    return { success: true };
  }
}

const createUpstashLimiter = (
  prefix: string,
  maxRequests: number,
  window: `${number} h` | `${number} m`,
): RateLimiter | null => {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(maxRequests, window),
    prefix,
  });

  return {
    limit: async (key: string) => {
      const result = await ratelimit.limit(key);
      return { success: result.success };
    },
  };
};

const ipLimiter =
  createUpstashLimiter("enquiry:ip", IP_LIMIT, "1 h") ??
  new MemoryRateLimiter(IP_LIMIT, WINDOW_MS);

const emailLimiter =
  createUpstashLimiter("enquiry:email", EMAIL_LIMIT, "1 h") ??
  new MemoryRateLimiter(EMAIL_LIMIT, WINDOW_MS);

export const checkEnquiryRateLimit = async (
  ip: string,
  email: string,
): Promise<RateLimitResult> => {
  const normalizedEmail = email.trim().toLowerCase();
  const [ipResult, emailResult] = await Promise.all([
    ipLimiter.limit(ip),
    emailLimiter.limit(normalizedEmail),
  ]);

  if (!ipResult.success || !emailResult.success) {
    return { success: false };
  }

  return { success: true };
};
