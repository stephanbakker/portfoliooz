'use strict';

import mongoose from 'mongoose';
import flickrUpdatePages from '../controllers/flickr-update-pages';
import config from '../config/config';
import datastore from '../db/datastore';
import datastoreUtils from '../db/datastore-utils';

export default pages;

function pages(req, res, next) {
    datastoreUtils.promiseAllPages(datastore)
        .then(pages => {
            const pageTitle = req.params.page;

            req.pages = pages;

            if (pageTitle) {
                req.page = pages.find(page => page.title = pageTitle);
            }

            next();
            return req.page;
        })
        .then(() => datastoreUtils.checkExpiresPhotos(datastore))
        .catch(err => {
            next(err);
        });
}

