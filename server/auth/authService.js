const User = require("../users/userModel");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");

exports.loginUser = async (registrationNumber, dateOfBirth) => {
  const user = await User.findOne({
    where: {
      registrationNumber,
      dateOfBirth,
      role: "user",
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);
  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      registrationNumber: user.registrationNumber,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
    },
  };
};

exports.loginAdmin = async (email) => {
  if (!email.endsWith("@msec.edu.in")) {
    throw new Error("Invalid admin email format");
  }

  const admin = await User.findOne({
    where: {
      email,
      role: "admin",
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const token = generateToken(admin.id);
  return {
    message: "Admin login successful",
    token,
    user: {
      id: admin.id,
      name: admin.name || "",
      email: admin.email,
      role: admin.role,
      dateOfBirth: admin.dateOfBirth,
    },
  };
};

exports.registerUser = async (registrationNumber, name, dateOfBirth) => {
  // Validate registration number format (3115YYDDD###)
  const regNumRegex = /^3115\d{2}\d{3}\d{3}$/;
  if (!regNumRegex.test(registrationNumber)) {
    throw new Error(
      "Invalid registration number format. Must be 3115YYDDD### format"
    );
  }

  const existingUser = await User.findOne({ where: { registrationNumber } });
  if (existingUser) {
    throw new Error("User with this registration number already exists");
  }

  const user = await User.create({
    name,
    registrationNumber,
    dateOfBirth,
    role: "user",
  });

  const token = generateToken(user.id);
  return {
    message: "Registration successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      registrationNumber: user.registrationNumber,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
    },
  };
};

exports.registerAdmin = async (email, name, dateOfBirth) => {
  if (!email.endsWith("@msec.edu.in")) {
    throw new Error("Admin must have an email with @msec.edu.in domain");
  }

  const existingAdmin = await User.findOne({ where: { email } });
  if (existingAdmin) {
    throw new Error("Admin with this email already exists");
  }

  const admin = await User.create({
    name: name || "",
    email,
    dateOfBirth: dateOfBirth || null,
    role: "admin",
  });

  const token = generateToken(admin.id);
  return {
    message: "Admin registration successful",
    token,
    user: {
      id: admin.id,
      name: admin.name || "",
      email: admin.email,
      role: admin.role,
      dateOfBirth: admin.dateOfBirth,
    },
  };
};
