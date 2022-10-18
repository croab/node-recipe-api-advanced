const morgan = require('morgan');

// Set morgan to be used if in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}