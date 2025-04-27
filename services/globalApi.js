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

//API Endpoints for Admin Management

// GET method for fetching all users (Admin only)
export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/users/allusers"); // Assuming you want to get all users
    return response.data;
  } catch (error) {
    console.error("Error during fetching all users:", error);
    throw error;
  }
};

//GET method for fetching only one user by id (Admin only)
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`); // Assuming you want to get a user by ID
    return response.data;
  } catch (error) {
    console.error("Error during fetching user by ID:", error);
    throw error;
  }
};

//PUT method for updating user by id (Admin only)
export const updateUserById = async (userId, userData) => {
  try {
    const response = await api.put(`/api/users/${userId}`, userData); // Pass userData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during updating user by ID:", error);
    throw error;
  }
};

//DELETE method for deleting user by id (Admin only)
export const deleteUserById = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}`); // Assuming you want to delete a user by ID
    return response.data;
  } catch (error) {
    console.error("Error during deleting user by ID:", error);
    throw error;
  }
};

//DELETE method for deleting the user permanently (Admin only)
export const deleteUserPermanently = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}/permanently`); // Assuming you want to delete a user permanently by ID
    return response.data;
  } catch (error) {
    console.error("Error during deleting user permanently:", error);
    throw error;
  }
};

//API Endpoints for Book Management (User and Admin)

// GET method for fetching all books
export const getAllBooks = async () => {
  try {
    const response = await api.get("/api/books/allbooks"); // Assuming you want to get all books
    return response.data;
  } catch (error) {
    console.error("Error during fetching all books:", error);
    throw error;
  }
};

// GET method for fetching a book by ID
export const getBookById = async (bookId) => {
  try {
    const response = await api.get(`/api/books/${bookId}`); // Assuming you want to get a book by ID
    return response.data;
  } catch (error) {
    console.error("Error during fetching book by ID:", error);
    throw error;
  }
};

// GET method for fetching book pdf by ID
export const getBookPdfById = async (bookId) => {
  try {
    const response = await api.get(`/api/books/${bookId}/pdf`); // Assuming you want to get a book pdf by ID
    return response.data;
  } catch (error) {
    console.error("Error during fetching book pdf by ID:", error);
    throw error;
  }
};

// API Endpoints for Book Management (Admin only)

// POST method for adding a new book (Admin only) (optional pdf)
export const addBook = async (bookData) => {
  try {
    const response = await api.post("/api/books/add", bookData); // Pass bookData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during adding a new book:", error);
    throw error;
  }
};

// PUT method for updating a book by ID (Admin only)
export const updateBookById = async (bookId, bookData) => {
  try {
    const response = await api.put(`/api/books/${bookId}`, bookData); // Pass bookData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during updating book by ID:", error);
    throw error;
  }
};

// DELETE method for deleting a book by ID (Admin only)
export const deleteBookById = async (bookId) => {
  try {
    const response = await api.delete(`/api/books/${bookId}`); // Assuming you want to delete a book by ID
    return response.data;
  } catch (error) {
    console.error("Error during deleting book by ID:", error);
    throw error;
  }
};

// DELETE method for deleting a book pdf by ID (Admin only)
export const deleteBookPdfById = async (bookId) => {
  try {
    const response = await api.delete(`/api/books/${bookId}/pdf`); // Assuming you want to delete a book pdf by ID
    return response.data;
  } catch (error) {
    console.error("Error during deleting book pdf by ID:", error);
    throw error;
  }
};

// PUT method for updating/uploading book pdf by ID (Admin only)
export const updateBookPdfById = async (bookId, pdfData) => {
  try {
    const response = await api.put(`/api/books/${bookId}/pdf`, pdfData); // Pass pdfData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during updating book pdf by ID:", error);
    throw error;
  }
};

// API Endpoints for Review Management

//GET method for fetching all reviews by book ID (User and Admin)
export const getAllReviewsByBookId = async (bookId) => {
  try {
    const response = await api.get(`/api/reviews/${bookId}/getreviews`); // Assuming you want to get all reviews by book ID
    return response.data;
  } catch (error) {
    console.error("Error during fetching all reviews by book ID:", error);
    throw error;
  }
};

//POST method for adding a new review (User and Admin)
export const addReview = async (bookId, reviewData) => {
  try {
    const response = await api.post(
      `/api/reviews/${bookId}/addreview`,
      reviewData
    ); // Pass reviewData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during adding a new review:", error);
    throw error;
  }
};

//PUT method for updating a review by ID (User and Admin)
export const updateReviewById = async (reviewId, reviewData) => {
  try {
    const response = await api.put(
      `/api/reviews/${reviewId}/updatereview`,
      reviewData
    ); // Pass reviewData as the request body
    return response.data;
  } catch (error) {
    console.error("Error during updating review by ID:", error);
    throw error;
  }
};

//DELETE method for deleting a review by ID (User and Admin)
export const deleteReviewById = async (reviewId) => {
  try {
    const response = await api.delete(`/api/reviews/${reviewId}/deletereview`); // Assuming you want to delete a review by ID
    return response.data;
  } catch (error) {
    console.error("Error during deleting review by ID:", error);
    throw error;
  }
};
