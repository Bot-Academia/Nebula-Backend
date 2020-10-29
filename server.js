require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const connect = require('./utils/db');
const eventsRoute = require('./routes/event');
const communityRoute = require('./routes/club');
const userRoute = require('./routes/user');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/events', eventsRoute);
app.use('/api/clubs', communityRoute);
app.use('/api/user', userRoute);

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = start;
