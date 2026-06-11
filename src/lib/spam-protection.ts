export type SpamCheckInput = {
  website?: string;
  formLoadedAt?: number;
  name: string;
  email: string;
  message?: string;
};

export type SpamCheckResult =
  | { blocked: false }
  | { blocked: true; reason: "honeypot" | "timing" | "content" };

const MIN_FORM_DURATION_MS = 3_000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const MAX_URLS_IN_MESSAGE = 5;

const URL_PATTERN = /https?:\/\/|www\./gi;

const isSuspiciousContent = (input: SpamCheckInput): boolean => {
  if (input.name.length > MAX_NAME_LENGTH) {
    return true;
  }

  if (input.email.length > MAX_EMAIL_LENGTH) {
    return true;
  }

  if (input.message && input.message.length > MAX_MESSAGE_LENGTH) {
    return true;
  }

  if (input.message) {
    const urlMatches = input.message.match(URL_PATTERN);

    if (urlMatches && urlMatches.length > MAX_URLS_IN_MESSAGE) {
      return true;
    }
  }

  return false;
};

const isSuspiciousTiming = (formLoadedAt?: number): boolean => {
  if (!formLoadedAt || !Number.isFinite(formLoadedAt)) {
    return true;
  }

  const elapsed = Date.now() - formLoadedAt;

  if (elapsed < MIN_FORM_DURATION_MS) {
    return true;
  }

  if (elapsed > MAX_FORM_AGE_MS) {
    return true;
  }

  return false;
};

export const checkSpam = (input: SpamCheckInput): SpamCheckResult => {
  if (input.website?.trim()) {
    return { blocked: true, reason: "honeypot" };
  }

  if (isSuspiciousTiming(input.formLoadedAt)) {
    return { blocked: true, reason: "timing" };
  }

  if (isSuspiciousContent(input)) {
    return { blocked: true, reason: "content" };
  }

  return { blocked: false };
};
