import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requêtes par minute
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    error: "Too many AI requests. Please wait a moment.",
  },
});