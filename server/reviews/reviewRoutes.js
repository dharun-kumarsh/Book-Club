const express = require("express");
const router = express.Router();
const reviewController = require("./reviewController");
const authMiddleware = require("../middleware/auth");

router.get("/books/:bookId", reviewController.getBookReviews);
router.post(
  "/books/:bookId",
  authMiddleware.authenticate,
  reviewController.createReview
);
router.put(
  "/reviews/:id",
  authMiddleware.authenticate,
  reviewController.updateReview
);
router.delete(
  "/reviews/:id",
  authMiddleware.authenticate,
  reviewController.deleteReview
);

module.exports = router;
