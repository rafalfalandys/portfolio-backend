const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const projectRouter = require('./routes/projectRoutes');
const photoRouter = require('./routes/photoRoutes');

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/photos', photoRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(404, `Cannot find ${req.originalUrl}. Available routes are '/api/v1/projects' and '/api/v1/photos'`),
  );
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
