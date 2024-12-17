const encode = require('../helpers/encode');

function shorten(req, res) {
  if (req.body.url) {
    const longUrl = req.body.url;
    // Check if url already exists in the database
    Url.findOne({ where: { longUrl } }).then(async (url) => {
      if (!url) {
        // Since it doesn't exist, let's go ahead and create it
        url = await Url.create({ longUrl });
      }
      res.status(201).json({ shortUrl: `${webhost}/${encode.encode(url.id)}` });
    });
  }
}
