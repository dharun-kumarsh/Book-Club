const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../utils/logger');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.userId = decoded.id; // Assuming your token payload has a user ID
      next();
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    logger.warn('Authentication failed: No token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;