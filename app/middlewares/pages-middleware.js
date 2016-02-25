'use strict';

import mongoose from 'mongoose';
const Page = mongoose.model('Page');
import flickrUpdatePages from '../controllers/flickr-update-pages';
import config from '../../config/config';

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
        Page.find((err, pages) => {
            if (err) {
                reject(err);
            }
            resolve(pages);
        });
    });
}

function findPage(pageObj) {
    return pageObj.title === this.title;
}

function checkExpiresPhotos(pageObj) {
    const savedDate = pageObj && pageObj.photosDate;
    if (savedDate && 
            (Date.now() - savedDate > config.flickr_expire_time)) {
        flickrUpdatePages();
    }
}



