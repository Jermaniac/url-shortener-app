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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const totalCount = await Url.countDocuments({});
    const totalPages = Math.ceil(totalCount / pageSize);

    const urls = await Url.find({}).skip(skip).limit(pageSize);

    res.json({
      data: urls,
      page,
      pageSize,
      totalPages: totalPages,
      totalCount: totalCount,
    });
  } catch (error) {
    res.status(500).send("Error retrieving URLs: " + error.message);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const urlFound = await Url.findOne({ short_url: req.params.id });
    await Url.updateOne(
      { _id: urlFound._id },
      { $set: { visits: urlFound.visits + 1, updated_at: new Date() } }
    );
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
      visits: 0,
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
