const Book = require('./bookModel');

exports.getAllBooks = async (filters) => {
  const query = {};
  if (filters.category) {
    query.where = { ...query.where, category: filters.category };
  }
  if (filters.format) {
    query.where = { ...query.where, format: filters.format };
  }
  return await Book.findAll(query);
};

exports.getBookById = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
};

exports.createBook = async (bookData) => {
  return await Book.create(bookData);
};

exports.updateBook = async (id, bookData) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return await book.update(bookData);
};

exports.deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.destroy();
};