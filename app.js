const express = require('express');
const cors = require('cors')
const logger = require('morgan');
require('dotenv').config();

const followersRouter = require('./routes/followers');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/followers', followersRouter);

// Catch 404
app.use((req, res, next) => {
  res.json({
    error: '404',
    message: 'Not Found'
  });
});

module.exports = app;
