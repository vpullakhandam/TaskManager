const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/tasks");

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

// Middlewares

app.use(cors());
app.use(express.json());

// Connecting to MongoDB

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Established connection to the Database");
});

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
