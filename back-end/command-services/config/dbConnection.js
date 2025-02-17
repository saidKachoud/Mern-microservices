const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
