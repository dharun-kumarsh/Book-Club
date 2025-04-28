// const supabase = require("../config/supabase");
// const { Book, sequelize } = require("./bookModel");
import supabase from "../config/supabase";
import { Book, sequelize } from "./bookModel";
class BookService {
  async getAllBooks(filters = {}) {
    const query = {};
    if (filters.category) {
      query.where = { ...query.where, category: filters.category };
    }
    if (filters.format) {
      query.where = { ...query.where, format: filters.format };
    }
    return await Book.findAll(query);
  }

  async getBookById(id) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  async createBook(bookData) {
    return await Book.create(bookData);
  }

  async createBookWithPdf(bookData, pdfFile) {
    const transaction = await sequelize.transaction();

    try {
      // First create the book record
      const book = await Book.create(bookData, { transaction });

      // Upload PDF to Supabase if file exists
      if (pdfFile) {
        await this.uploadBookPdfToSupabase(book, pdfFile, transaction);
      }

      await transaction.commit();
      return book;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateBook(id, bookData) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return await book.update(bookData);
  }

  async updateBookPdf(bookId, pdfFile) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book not found");

    // Delete old PDF if exists
    if (book.pdfPath) {
      await this.deletePdfFromSupabase(book.pdfPath);
    }

    // Upload new PDF
    await this.uploadBookPdfToSupabase(book, pdfFile);
    return book;
  }

  async deleteBook(id) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Book not found");
    }

    // Delete associated PDF if exists
    if (book.pdfPath) {
      await this.deletePdfFromSupabase(book.pdfPath);
    }

    await book.destroy();
    return book;
  }

  async deleteBookPdf(bookId) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book not found");
    if (!book.pdfPath) throw new Error("No PDF associated with this book");

    await this.deletePdfFromSupabase(book.pdfPath);

    // Update book record
    await book.update({
      pdfUrl: null,
      pdfPath: null,
    });

    return book;
  }

  async getBookPdf(bookId) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error("Book not found");
    if (!book.pdfUrl) throw new Error("No PDF available for this book");

    return book.pdfUrl;
  }

  // Helper methods for Supabase operations
  async uploadBookPdfToSupabase(book, pdfFile, transaction = null) {
    const filePath = `books/${book.id}/${pdfFile.originalname}`;

    const { error } = await supabase.storage
      .from("book-pdfs")
      .upload(filePath, pdfFile.buffer, {
        contentType: pdfFile.mimetype,
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("book-pdfs").getPublicUrl(filePath);

    // Update book with PDF info
    const updateData = {
      pdfUrl: publicUrl,
      pdfPath: filePath,
    };

    if (transaction) {
      await book.update(updateData, { transaction });
    } else {
      await book.update(updateData);
    }
  }

  async deletePdfFromSupabase(pdfPath) {
    const { error } = await supabase.storage
      .from("book-pdfs")
      .remove([pdfPath]);

    if (error) throw error;
  }
}

module.exports = new BookService();
