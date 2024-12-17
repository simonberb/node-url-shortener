const Url = require('../models/Url');
const encoder = require('../helpers/encode');
const decoder = require('../helpers/decode

const webhost = 'http://localhost:3000';

function shorten(req, res) {
  if (req.body.url) {
    const longUrl = req.body.url;
    // Check if url already exists in the database
    Url.findOne({ where: { longUrl } }).then(async (url) => {
      if (!url) {
        // Since it doesn't exist, let's go ahead and create it
        url = await Url.create({ longUrl });
        res.status(200).json({ shortUrl: `${webhost}/${encode.encoder(url.id)}` });
      }
      else {
        res.status(201).json({ shortUrl: `${webhost}/${encode.encoder(url.id)}` });
      }
    });
  }
}

function decode(req, res) {
  const base58ID = req.params.encodedId;
  const id = decoder.decode(base58ID);
  // Check if url already exists in the database
  Url.findOne({ where: { id } }).then((url) => {
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.redirect(webhost);
    }
  });
}

module.exports = {
  shorten, decode,
};
