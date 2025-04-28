// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const morgan = require("morgan");
// const sequelize = require("./config/database");
// const logger = require("./utils/logger");

// // Import routes
// const authRoutes = require("./auth/authRoutes");
// const userRoutes = require("./users/userRoutes");
// const bookRoutes = require("./books/bookRoutes");
// const reviewRoutes = require("./reviews/reviewRoutes");

// // Import models for associations
// const User = require("./users/userModel");
// const Book = require("./books/bookModel");
// const Review = require("./reviews/reviewModel");

// const app = express();
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import sequelize from "./config/database.js";
import logger from "./utils/logger.js";

// Import routes
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes";
import bookRoutes from "./books/bookRoutes";
import reviewRoutes from "./reviews/reviewRoutes";

// Import models for associations
import User from "./users/userModel";
import Book from "./books/bookModel";
import Review from "./reviews/reviewModel";

const app = express();
// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use("/api/", limiter);

// Request logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Model associations
User.hasMany(Review, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "reviews",
});
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Book.hasMany(Review, {
  foreignKey: "bookId",
  onDelete: "CASCADE",
  as: "reviews",
});
Review.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");

    // Sync models with database
    const syncOptions =
      process.env.NODE_ENV === "production" ? {} : { alter: true };

    await sequelize.sync(syncOptions);
    logger.info("Database synchronized");

    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  } catch (error) {
    logger.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
