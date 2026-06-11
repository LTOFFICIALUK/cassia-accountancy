const getForwardedIp = (forwardedFor: string): string | null => {
  const firstIp = forwardedFor.split(",")[0]?.trim();

  if (!firstIp) {
    return null;
  }

  return firstIp;
};

export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const ip = getForwardedIp(forwardedFor);

    if (ip) {
      return ip;
    }
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
};
