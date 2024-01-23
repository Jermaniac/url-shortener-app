const express = require('express');
const { connectToDatabase } = require('./config/db');
const Url = require('./models/urls');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

connectToDatabase();

app.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find({});
    res.json(urls);
  } catch (error) {
    console.error('Error retrieving URLs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const urlFound = await Url.findOne({ short_url: req.params.id });
    if (urlFound) res.redirect(urlFound.long_url)
    next()
  } catch (error) {
    console.error('Error retrieving URLs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/add", async (req, res) => {
  // here is the logic for creating a unique shorUrl id
  const shortUrl = '1234567'
	const url = new Url({
		long_url: req.body.long_url,
    short_url: shortUrl,
    updated_at: new Date()
	})
	await url.save()
	res.send(url)
})

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});