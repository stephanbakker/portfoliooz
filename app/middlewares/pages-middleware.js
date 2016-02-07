'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');

module.exports = pages;

function pages(req, res, next) {
    promiseAllPages()
        .then(pages => { 
            const pageTitle = req.params.page;

            req.pages = pages;

            if (pageTitle) {
                req.page = pages.find(findPage(pageTitle)); 
            }

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

function findPage(pageTitle) {
    return function (pageObj) {
        return pageObj.title === pageTitle;
    }
}



