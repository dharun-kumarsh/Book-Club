// const { validationResult } = require('express-validator');
// const reviewService = require('./reviewService');
// const logger = require('../utils/logger');
import { validationResult } from 'express-validator';
import * as reviewService from './reviewService';
import logger from '../utils/logger';

exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getBookReviews(req.params.bookId);
    res.status(200).json(reviews);
  } catch (error) {
    logger.error(`Get book reviews error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await reviewService.createReview(req.params.bookId, req.userId, req.body);
    res.status(201).json(review);
  } catch (error) {
    logger.error(`Create review error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await reviewService.updateReview(req.params.id, req.userId, req.body);
    res.status(200).json(review);
  } catch (error) {
    logger.error(`Update review error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id, req.userId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    logger.error(`Delete review error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};