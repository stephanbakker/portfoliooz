'use strict';

import mongoose from 'mongoose';
import flickrUpdatePages from '../controllers/flickr-update-pages';
import config from '../config/config';
import datastore from '../db/datastore';

export default pages;

function pages(req, res, next) {
    promiseAllPages()
        .then(pages => {
            const pageTitle = req.params.page;

            req.pages = pages;

            if (pageTitle) {
                req.page = pages.find(findPage.bind({title: pageTitle}));
            }

            next();
            return req.page;
        })
        .then(checkExpiresPhotos)
        .catch(err => {
            next(err);
        });
}

function promiseAllPages() {
    return new Promise((resolve, reject) => {
        const pages = datastore.getPages();

        if (pages) {
            return resolve(pages);
        } else {
            reject('no pages found');
        }
    });
}

function findPage(pageObj) {
    return pageObj.title === this.title;
}

function checkExpiresPhotos() {
    const savedDate = datastore.getSaveDate('photo');
    if (savedDate && 
            (Date.now() - savedDate > config.flickr_expire_time)) {
        flickrUpdatePages();
    }
}



