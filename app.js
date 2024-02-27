const express = require('express');

const app = express();
const morgan = require('morgan');

const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
