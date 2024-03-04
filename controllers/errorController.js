const AppError = require('../utils/appError');

const handleCastError = (err) => {
  const msg = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(400, msg);
};

const handleDuplicate = (err) => {
  const msg = `Duplicate item ${err.keyValue._id}.`;
  return new AppError(400, msg);
};

const handleValidationErrorDB = (err) => {
  const msg = `Invalid input data. ${err}`;
  return new AppError(400, msg);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Operational error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown error
    console.error('ERROR! 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.code === 11000) err = handleDuplicate(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
