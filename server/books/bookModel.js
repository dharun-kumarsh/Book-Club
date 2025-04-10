const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  format: {
    type: DataTypes.ENUM('PDF', 'EPUB', 'MOBI'),
    allowNull: false
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Book;