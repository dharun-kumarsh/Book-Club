// const { validationResult } = require('express-validator');
// const bookService = require('./bookService');
// const logger = require('../utils/logger');
import { validationResult } from 'express-validator';
import * as bookService from './bookService';
import logger from '../utils/logger';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks(req.query);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    logger.error(`Get all books error: ${error.message}`);
    next(error);
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    logger.error(`Get book error: ${error.message}`);
    next(error);
  }
};

// @desc    Create book
// @route   POST /api/books
// @access  Private/Admin
exports.createBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    let book;
    if (req.file) {
      book = await bookService.createBookWithPdf(req.body, req.file);
    } else {
      book = await bookService.createBook(req.body);
    }

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    logger.error(`Create book error: ${error.message}`);
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    logger.error(`Update book error: ${error.message}`);
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error(`Delete book error: ${error.message}`);
    next(error);
  }
};

// @desc    Upload book PDF
// @route   PUT /api/books/:id/pdf
// @access  Private/Admin
exports.uploadBookPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF file'
      });
    }

    const book = await bookService.updateBookPdf(req.params.id, req.file);
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    logger.error(`Upload book PDF error: ${error.message}`);
    next(error);
  }
};

// @desc    Delete book PDF
// @route   DELETE /api/books/:id/pdf
// @access  Private/Admin
exports.deleteBookPdf = async (req, res, next) => {
  try {
    const book = await bookService.deleteBookPdf(req.params.id);
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    logger.error(`Delete book PDF error: ${error.message}`);
    next(error);
  }
};

// @desc    Get book PDF URL
// @route   GET /api/books/:id/pdf
// @access  Public
exports.getBookPdf = async (req, res, next) => {
  try {
    const pdfUrl = await bookService.getBookPdf(req.params.id);
    res.status(200).json({
      success: true,
      data: { pdfUrl }
    });
  } catch (error) {
    logger.error(`Get book PDF error: ${error.message}`);
    next(error);
  }
};