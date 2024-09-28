const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const taskRoutes = require("./routes/tasks");

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to Database

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
  "Established connection to Database";
});

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
