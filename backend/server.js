const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.REACT_PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to Database

const uri = process.env.REACT_MONGODB_URI;

moongose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = moongose.connection;
connection.once("open", () => {
  console.log("Connection established with MongoDB");
});

app.listen(port, () => {
  console.log(`Sever running on port : ${port}`);
});
