const express = require("express");
const app = express();

app.use(express.json());

const products = require("./routes/products.routes");

app.use("/api/v1", products);

module.exports = app;
