'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');

module.exports = {
    page: page
}

function page(req, res, next) {

    let pageName = req.params.page;

    let promises = [promiseAllPages()];

    if (pageName) {
        promises.push(promisePage(pageName));
    }

    Promise.all(promises)
        .then(function (values) {

            req.pages = values[0];
            req.page = values[1];

            next();
        })
        .catch(function (err) {
            throw err;
        });
};

function promiseAllPages() {
    return new Promise(function (resolve, reject) {
        Page.find(function (err, pages) {
            if (err) {
                reject(err);
            }
            resolve(pages);
        });
    });
}

function promisePage(pageName) {
    return new Promise(function (resolve, reject) {
        Page.findOne({name: pageName}, function (err, page) {
            if (err) {
                reject(err);
            }
            resolve(page);
        });
    });
}


