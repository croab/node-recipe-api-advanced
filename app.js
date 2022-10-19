// Imports
const express = require('express');
const morgan = require('morgan');
const recipeRouter = require('./routes/recipeRoutes');

// Instantiate app
const app = express();

// Implement middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// Mount routes
app.use('/api/v1/recipes', recipeRouter);

// If above routes are not found trigger the below
app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail'
  })
});

module.exports = app;