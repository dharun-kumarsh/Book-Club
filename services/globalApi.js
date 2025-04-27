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

// API Endpoints for User Management

// GET method for fetching user profile
export const getProfile = async () => {
  try {
    const response = await api.get("/api/users/profile"); // Assuming you want to get the profile of the logged-in user
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// PUT method for updating user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put("/api/users/profile", userData); // Pass userData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during profile update:", error);
    throw error;
  }
};
