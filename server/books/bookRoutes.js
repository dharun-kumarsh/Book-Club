// const express = require("express");
// const router = express.Router();
// const { check } = require("express-validator");
// const upload = require("../middleware/upload");
// const { authorize, authenticate } = require("../middleware/auth");
// const bookController = require("./bookController");
import express from "express";
const router = express.Router();
import { check } from "express-validator";
import upload from "../middleware/upload";
import { authorize, authenticate } from "../middleware/auth";
import * as bookController from "./bookController";
// Public routes
router.get("/allbooks", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
router.get("/:id/pdf", bookController.getBookPdf);

// Protected admin routes
router.use(authenticate, authorize("admin"));

// Create book with optional PDF upload
router.post(
  "/addbook",
  upload.single("pdf"),
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  bookController.createBook
);

// Update book details
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
  ],
  bookController.updateBook
);

// Delete book
router.delete("/:id", bookController.deleteBook);

// Upload/update book PDF
router.put("/:id/pdf", upload.single("pdf"), bookController.uploadBookPdf);

// Delete book PDF
router.delete("/:id/pdf", bookController.deleteBookPdf);

module.exports = router;
