const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Import routes
const taskRoutes = require("./routes/tasks");

// Use routes
app.use("/api/tasks", taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
