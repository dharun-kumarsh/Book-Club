const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Global error handler caught an error: ${err.message}`);

  // Log the full error stack in development environment
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Customize error responses based on the type of error if needed
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
    return res.status(400).json({ message: 'Validation error', errors });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    // Optionally include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;