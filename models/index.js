const mongoose = require("mongoose");
const dbConfig = require("../config/connect");

mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

module.exports = mongoose;
