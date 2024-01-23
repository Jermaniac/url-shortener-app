const express = require('express');
const { connectToDatabase } = require('./config/db');
const Url = require('./models/urls');

const app = express();

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

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});