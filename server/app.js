const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./auth/authRoutes');
const userRoutes = require('./users/userRoutes');
const bookRoutes = require('./books/bookRoutes');
const reviewRoutes = require('./reviews/reviewRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

// Define model associations
const User = require('./users/userModel');
const Book = require('./books/bookModel');
const Review = require('./reviews/reviewModel');

// User-Review association
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Book-Review association
Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = app;