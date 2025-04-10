const { validationResult } = require('express-validator');
const bookService = require('./bookService');
const logger = require('../utils/logger');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks(req.query);
    res.status(200).json(books);
  } catch (error) {
    logger.error(`Get all books error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    logger.error(`Get book by ID error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    logger.error(`Create book error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(book);
  } catch (error) {
    logger.error(`Update book error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    logger.error(`Delete book error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};