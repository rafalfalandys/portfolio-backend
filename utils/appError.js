class AppError extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // handling double stacktrace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
