const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Importing the task routes
const taskRoutes = require("./routes/tasks");

// Use routes
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
