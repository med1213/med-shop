const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(conn => {
    console.log(`server was connect to mongodb success with host : ${conn.connection.host}`);
  })
};

module.exports = connectDatabase;
