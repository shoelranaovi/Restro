/**
 * Utility function to send consistent API responses
 * @param {Object} res - Express response object
 * @param {number} [statusCode=200] - HTTP status code
 * @param {string} [message=""] - Response message
 * @param {*} [data=null] - Response data payload
 * @param {Object} [error=null] - Error details (if any)
 * @returns {Object} Express response object
 */
const sendResponse = (
  res,
  statusCode = 200,
  message = "",
  data = null,
  error = null
) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    isError: statusCode < 200 || statusCode >= 300,
    message,
    data,
  };

  // Only include error field if there's an actual error
  if (error) {
    response.error = process.env.NODE_ENV === 'production' 
      ? { message: error.message }
      : error;
  }

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;