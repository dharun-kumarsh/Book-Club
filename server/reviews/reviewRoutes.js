// const express = require("express");
// const router = express.Router();
// const reviewController = require("./reviewController");
// const authMiddleware = require("../middleware/auth");
import express from "express";
const router = express.Router();
import * as reviewController from "./reviewController";
import * as authMiddleware from "../middleware/auth";

router.get("/books/:bookId/getreviews", reviewController.getBookReviews);
router.post(
  "/books/:bookId/addreview",
  authMiddleware.authenticate,
  reviewController.createReview
);
router.put(
  "/reviews/:id/updatereview",
  authMiddleware.authenticate,
  reviewController.updateReview
);
router.delete(
  "/reviews/:id/deletereview",
  authMiddleware.authenticate,
  reviewController.deleteReview
);

module.exports = router;
