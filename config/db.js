require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectToDatabase,
};
