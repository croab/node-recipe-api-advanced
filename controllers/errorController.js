// HANDLE ERRORS IN DEV
const sendErrDev = (err, res) => {
  res
    .status(err.statusCode)
    .json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
}
// HANDLE ERRORS IN PROD
const sendErrProd = (err, res) => {
  // Check if error is operational
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({
        status: err.status,
        message: err.message
      });
  // Catch other errors
  } else {
    // Log to console
    console.log(err);
    res
      .status(500)
      .json({
        status: 'error',
        message: "Something went wrong..."
      });
  }
}

// MAIN: ERROR LOGIC
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error (generic)';
  switch (process.env.NODE_ENV) {
    case 'development':
      sendErrDev(err, res);
      break;
    case 'production':
      sendErrProd(err, res);
      break;
  }
}