'use strict';

const fs = require('fs');
const markdown = require('markdown').markdown;

const middlewares = require('../app/middlewares/pages-middleware');
const pages = require('../app/controllers/pages');


module.exports = function (app) {

    app.get('/', middlewares.page, pages.index);
    app.get('/:page', middlewares.page, pages.content);

    app.post('/content-update', pages.update);

}
