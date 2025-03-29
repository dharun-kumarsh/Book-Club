const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error");
const sequelize = require("./config/database"); // Import database connection
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use(routes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
