const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');
const authMiddleware = require('../middleware/auth');

router.get('/books/:bookId/reviews', reviewController.getBookReviews);
router.post('/books/:bookId/reviews', authMiddleware, reviewController.createReview);
router.put('/reviews/:id', authMiddleware, reviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;