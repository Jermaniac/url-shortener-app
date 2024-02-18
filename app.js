const express = require("express");
const cors = require("cors");
const { customAlphabet } = require("nanoid");
const bodyParser = require("body-parser");

const { connectToDatabase } = require("./config/db");
const Url = require("./models/urls");

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

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

app.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find({});
    res.json(urls);
  } catch (error) {
    res.status(500).send("Error retrieving URLs: ", error);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const urlFound = await Url.findOne({ short_url: req.params.id });
    if (urlFound) res.redirect(urlFound.long_url);
    next();
  } catch (error) {
    res.status(500).send("Error finding URL: ", error);
  }
});

app.post("/add", async (req, res) => {
  try {
    const { long_url } = req.body;
    const shortUrl = await generateUniqueCode();
    const url = await Url.create({
      long_url: long_url,
      short_url: shortUrl,
      updated_at: new Date(),
    });
    res.status(200).send({ short_url: url.short_url });
  } catch (error) {
    res.status(500).send("Error adding a new url: ", error);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Express app listening on port ", port);
});
