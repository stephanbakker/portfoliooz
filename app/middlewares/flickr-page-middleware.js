'use strict';

const mongoose = require('mongoose');
const PhotoSet = mongoose.model('PhotoSet');
const config = require('../../config/config');

module.exports = photoPage;

function photoPage(req, res, next) {
    promisePhotoPage(req.params.page)
        .then(photoPage => {
            console.log('\nphotoPage: ', photoPage.title);
            if (photoPage) {
                req.page = {
                    title: photoPage.title,
                    photos: photoPage.photos
                };
            }

            next();
        })
        .catch(err => {
            next(err);
        });
};

function promisePhotoPage(pageTitle) {
    return new Promise((resolve, reject) => {
        if (pageTitle) {
            PhotoSet.findOne({title: pageTitle}, (err, page) => {
                if (err) {
                    reject(err);
                }
                resolve(page);
            });
        } else {
            resolve({});
        }
    });
}
