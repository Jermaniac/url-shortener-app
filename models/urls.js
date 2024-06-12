const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  long_url: String,
  short_url: {
    type: String,
    unique: true,
  },
  visits: Number,
  updated_at: Date,
});

module.exports = mongoose.model("url", UrlSchema, "url");
