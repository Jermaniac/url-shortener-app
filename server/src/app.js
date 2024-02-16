const express = require("express");
const { connectToDatabase } = require("./config/db");
const Url = require("./models/urls");
const bodyParser = require("body-parser");
const { customAlphabet } = require("nanoid");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

app.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find({});
    res.json(urls);
  } catch (error) {
    console.error("Error retrieving URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req, res, next) => {
  const urlFound = await Url.findOne({ short_url: req.params.id });
  if (urlFound) res.redirect(urlFound.long_url);
  next();
});

const generateUniqueCode = async () => {
  const generatedCode = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
  );
  const existingCode = await Url.findOne({ short_url: generatedCode() });
  if (existingCode) {
    generateUniqueCode();
  }
  return generatedCode();
};

app.post("/add", async (req, res) => {
  const generatedUniqueCode = await generateUniqueCode();
  const url = new Url({
    long_url: req.body.long_url,
    short_url: generatedUniqueCode,
    updated_at: new Date(),
  });
  await url.save();
  res.send(url);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Express app listening on port 3000");
});
