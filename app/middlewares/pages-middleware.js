'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const config = require('../../config/config');

module.exports = pages;

function pages(req, res, next) {
    promiseAllPages()
        .then(pages => {
            req.pages = pages;

            next();
        })
        .catch(err => {
            next(err);
        });
};

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

function promisePage(pageName) {
    return new Promise((resolve, reject) => {
        if (pageName) {
            Page.findOne({name: pageName}, (err, page) => {
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
