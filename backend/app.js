const express = require("express");
const app = express();
const errMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const products = require("./routes/products.routes");
const auth = require("./routes/auth.routes");
const order = require("./routes/order.routes");
const payment = require("./routes/payment.routes");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use(errMiddleware);

module.exports = app;
