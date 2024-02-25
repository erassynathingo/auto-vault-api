const logger = require("../utils/logger");

/**
 * Middleware to log the request and response status and other relevant information.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const requestLogger = (req, res, next) => {
  // console.log("Request: ", req)
  const start = new Date().getTime();
  const formattedDate = new Date(start).toISOString().slice(0, 16).replace('T', ' ');

  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    logger.info(`${formattedDate} - ${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  next();
};

module.exports = requestLogger;
