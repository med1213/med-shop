const express = require("express");
const app = express();
const errMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const products = require("./routes/products.routes");
const auth = require("./routes/auth.routes");
const order = require("./routes/order.routes");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

app.use(errMiddleware);

module.exports = app;
