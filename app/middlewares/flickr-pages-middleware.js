'use strict';

const mongoose = require('mongoose');
const PhotoPage = mongoose.model('PhotoPage');

const updatePhotoPages = require('../controllers/flickr-update-pages');

module.exports = photoPages;

function photoPages(req, res, next) {
    promiseAllPages()
        .then(checkExpiredPhotos)
        .then(photoPages => {
            req.photoPages = photoPages;
            req.pages = req.pages || [];

            req.pages = req.pages.concat(photoPages);

            next();
        })
        .catch(err => {
            next(err);
        });
};

function promiseAllPages() {
    return new Promise((resolve, reject) => {
        PhotoPage.find((err, photoPages) => {
            if (err) {
                reject(err);
            }
            resolve(photoPages);
        });
    });
}

function checkExpiredPhotos(photoPages) {
    const savedDate = photoPages[0] && photoPages[0].date;
    const maxAge = 1000 * 60 * 60 * 24; // 1 day

    if (!savedDate) {
        console.warn('no saved Date for photoPages found');
    } else if (Date.now() - savedDate > maxAge) {
        updatePhotoPages(); 
    }

    return photoPages;
}
