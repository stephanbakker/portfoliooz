'use strict';
const pages = require('../app/controllers/pages');
const updatePhotoPages = require('../app/controllers/flickr-update-pages');

const pagesMiddleware = require('../app/middlewares/pages-middleware');

module.exports = function (app) {

    app.get('/', pagesMiddleware, pages.index);

    app.post('/content-update', pages.update);
    app.post('/flickr-update', updatePhotoPages);

    app.get('/:page', pagesMiddleware, pages.content);

}
