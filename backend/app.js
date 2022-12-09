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

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const products = require("./routes/products.routes");
const auth = require("./routes/auth.routes");
const order = require("./routes/order.routes");
const payment = require("./routes/payment.routes");


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Med Shopping Online API",
        description: "Med Shopping Online API Information",
      },
      components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          jwt: [],
        },
      ],
      swagger: "3.0",
      servers: [
        { url: `http://localhost:3001` },
      ],
    },
    // ['.routes/*.js']
    apis: ["./routes/*.js"],
  };
  
  //Swagger
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use(
    "/Swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
  );

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use(errMiddleware);

module.exports = app;
