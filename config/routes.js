'use strict';
const pages = require('../app/controllers/pages');

// middlewares
const pageMiddleware = require('../app/middlewares/page-middleware');
const pagesMiddleware = require('../app/middlewares/pages-middleware');

const flickrApi = require('../app/middlewares/flickr-middleware-pages');
const flickrApiPage = require('../app/middlewares/flickr-middleware-page');

module.exports = function (app) {

    app.get('/', pagesMiddleware, flickrApi.pages, pages.index);
    app.get('/:page', pagesMiddleware, pageMiddleware, flickrApi.pages, flickrApiPage, pages.content);

    app.post('/content-update', pages.update);

}
