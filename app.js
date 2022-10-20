// Imports
const express = require('express');
const morgan = require('morgan');

const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');

// Instantiate app
const app = express();

// Implement middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

// Mount routes
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);

// If above routes are not found trigger the below
app.use('*', (req, res, next) => {
  next(new CustomError(
    `Cannot find ${req.originalUrl} on this server.`,
    404
  ));
});

// Then handle all errors if any arise - TODO
app.use(globalErrorHandler);

module.exports = app;