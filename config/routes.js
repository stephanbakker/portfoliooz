'use strict';
const pages = require('../app/controllers/pages');
const updatePhotoPages = require('../app/controllers/flickr-update-pages');

// middlewares
const pageMiddleware = require('../app/middlewares/page-middleware');
const pagesMiddleware = require('../app/middlewares/pages-middleware');

const flickrApiPages = require('../app/middlewares/flickr-pages-middleware');
const flickrApiPage = require('../app/middlewares/flickr-page-middleware');

module.exports = function (app) {

    app.get('/', pagesMiddleware, flickrApiPages, pageMiddleware, pages.index);

    app.post('/content-update', pages.update);
    app.post('/flickr-update', updatePhotoPages);

    app.get('/:page', pagesMiddleware, flickrApiPages, pageMiddleware, flickrApiPage, pages.content);


}
