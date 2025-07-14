const rateLimit = require('express-rate-limit');
// Rate limiting for sensitive operations
const createLimiter = (windowMs, max, message) => 
    rateLimit({
      windowMs,
      max,
      message: { success: false, message },
      standardHeaders: true,
      legacyHeaders: false,
    });
  
 export const loginLimiter = createLimiter(15 * 60 * 1000, 5, 'Too many login attempts, please try again later');
 export const resetPasswordLimiter = createLimiter(60 * 60 * 1000, 3, 'Too many password reset attempts, please try again later');
  