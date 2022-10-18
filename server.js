// Imports
const express = require('express');
const morgan = require('morgan');

const app = express();

// Set morgan to be used if in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Parse incoming data and add to req
app.use(express.json());

// Need to connect to MongoDB

// Creating server
const port = process.env.NODE_ENV || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});