const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');

import errorMiddleware from '../middlewares/error-middleware';

module.exports = function(app) {
  app.use(compression());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(favicon(path.join(__dirname, '../../public/favicon.ico')));
  app.use(errorMiddleware);
};

