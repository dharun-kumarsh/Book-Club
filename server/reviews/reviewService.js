// const Review = require('./reviewModel');
// const Book = require('../books/bookModel');
// const User = require('../users/userModel');
import Review from './reviewModel';
import Book from '../books/bookModel';
import User from '../users/userModel';

exports.getBookReviews = async (bookId) => {
  return await Review.findAll({
    where: { bookId },
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
  });
};

exports.createReview = async (bookId, userId, reviewData) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  return await Review.create({
    ...reviewData,
    bookId,
    userId
  });
};

exports.updateReview = async (reviewId, userId, reviewData) => {
  const review = await Review.findByPk(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  if (review.userId !== userId) {
    throw new Error('Unauthorized to update this review');
  }

  return await review.update(reviewData);
};

exports.deleteReview = async (reviewId, userId) => {
  const review = await Review.findByPk(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  if (review.userId !== userId) {
    throw new Error('Unauthorized to delete this review');
  }

  await review.destroy();
};