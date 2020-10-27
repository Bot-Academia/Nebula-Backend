require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const connect = require('./utils/db');

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
