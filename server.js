// Imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Set morgan to be used if in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Parse incoming data and add to req
app.use(express.json());

// Connect MongoDB
const password = process.env.PASSWORD;
const db = process.env.DATABASE.replace('<PASSWORD>', password);
mongoose.connect(db).then(() => {
  console.log('Successfully connected to database...')
});

// Creating server
const port = process.env.NODE_ENV || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});