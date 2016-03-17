const express = require('express');
const path = require('path');
import errorMiddleware from '../middlewares/error-middleware';

module.exports = function (app) {
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(errorMiddleware);
};

