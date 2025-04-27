const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false, // Assuming date of birth is mandatory
    },
  },
  {
    timestamps: true,
  }
);


User.prototype.toJSON = function () {
  const values = { ...this.get() };
  // No password to delete
  return values;
};

module.exports = User;
