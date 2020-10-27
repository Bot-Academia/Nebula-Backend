const mongoose = require('mongoose');

const connect = (url = process.env.DATABASE_URL, opts = {}) => mongoose.connect(
  url,
  { ...opts, useNewUrlParser: true },
);

module.exports = connect;
