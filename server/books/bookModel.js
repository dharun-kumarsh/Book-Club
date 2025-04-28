// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isISBN: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    format: {
      type: DataTypes.ENUM("PDF"),
      allowNull: false,
      defaultValue: "PDF",
    },
    publishDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    pdfPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enables soft deletion
    indexes: [
      {
        fields: ["title"],
      },
      {
        fields: ["author"],
      },
      {
        fields: ["category"],
      },
      {
        unique: true,
        fields: ["isbn"],
      },
    ],
  }
);

module.exports = Book;
