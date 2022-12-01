const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

const cloudinary = require("cloudinary");
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to Uncaught exception");
  process.exit(1);
});

app.listen(process.env.PORT, () => {
  console.log(
    `api server is running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandle promise rejestion");
  server.close(() => {
    process.exit(1);
  });
});
