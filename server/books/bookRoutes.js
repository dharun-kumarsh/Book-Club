const express = require("express");
const router = express.Router();
const bookController = require("./bookController");
const authMiddleware = require("../middleware/auth");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", authMiddleware, bookController.createBook);
router.put("/:id", authMiddleware, bookController.updateBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
