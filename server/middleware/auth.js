// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../users/userModel");
// const logger = require("../utils/logger");
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../users/userModel";
import logger from "../utils/logger";
// Authentication middleware
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found with this token");
      }
      if (req.user.status !== "active") {
        res.status(403);
        throw new Error(
          `Account is ${req.user.status}. Please contact support.`
        );
      }
      next();
    } catch (error) {
      logger.error("Authentication error:", error);
      res.status(401);
      if (error.name === "JsonWebTokenError") {
        throw new Error("Not authorized, invalid token");
      }
      if (error.name === "TokenExpiredError") {
        throw new Error("Not authorized, token expired");
      }
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Role authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, authentication required");
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};
module.exports = {
  authenticate,
  authorize,
};
