import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// API Endpoints for Authentication

// POST method for register
export const registerData = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData); // Pass userData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// POST method for login
export const loginData = async (loginCredentials) => {
  try {
    const response = await api.post("/api/auth/login", loginCredentials); // Pass login credentials as the request body
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
