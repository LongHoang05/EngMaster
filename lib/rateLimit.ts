type RateLimitEntry = {
  count: number;
  resetTime: number;
};

// Lưu trữ số lần request của từng IP trong bộ nhớ tạm thời
const rateLimitCache = new Map<string, RateLimitEntry>();

export function checkRateLimit(ip: string, limit: number = 15, windowMs: number = 60000): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const entry = rateLimitCache.get(ip);

  if (!entry) {
    rateLimitCache.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, limit, remaining: limit - 1 };
  }

  // Nếu đã qua khoảng thời gian reset, xóa dữ liệu cũ và bắt đầu tính lại
  if (now > entry.resetTime) {
    rateLimitCache.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, limit, remaining: limit - 1 };
  }

  // Nếu vẫn trong khoảng thời gian reset
  if (entry.count < limit) {
    entry.count += 1;
    return { success: true, limit, remaining: limit - entry.count };
  }

  // Vượt quá giới hạn
  return { success: false, limit, remaining: 0 };
}
