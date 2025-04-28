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
    name: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for admins
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Only required for admins
      unique: true,
      validate: {
        isEmail: true,
        isAdminEmail(value) {
          // If email is provided, it must be an admin email
          if (value && !value.endsWith("@msec.edu.in")) {
            throw new Error("Admin email must end with @msec.edu.in");
          }
        },
      },
    },
    registrationNumber: {
      type: DataTypes.STRING(12),
      allowNull: true, // Only required for users
      unique: true,
      validate: {
        is: /^3115\d{2}\d{3}\d{3}$/,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Optional for admins
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enable soft deletes
    hooks: {
      beforeValidate(user) {
        // Ensure either email (for admin) or registrationNumber (for user) is provided
        if (!user.email && !user.registrationNumber) {
          throw new Error(
            "Either email (for admin) or registrationNumber (for user) must be provided"
          );
        }

        // If email is provided and is admin format, set role to admin
        if (user.email && user.email.endsWith("@msec.edu.in")) {
          user.role = "admin";
        }

        // If registrationNumber is provided, set role to user
        if (user.registrationNumber) {
          user.role = "user";
        }
      },
      beforeCreate(user) {
        // Validate that admin has email and user has registrationNumber
        if (user.role === "admin" && !user.email) {
          throw new Error("Admin must have an email");
        }

        if (user.role === "user" && !user.registrationNumber) {
          throw new Error("User must have a registration number");
        }
      },
    },
  }
);

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  return values;
};

module.exports = User;
