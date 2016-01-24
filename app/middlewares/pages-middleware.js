'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const config = require('../../config/config');

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
        .then(values => {

            req.pages = values[0];
            req.page = values[1];
            
            // check if it is a work page
            req.work = config.workPages.some(page => page.name === req.page.name);

            next();
        })
        .catch(err => {throw err});
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
        Page.findOne({name: pageName}, (err, page) => {
            if (err) {
                reject(err);
            }
            resolve(page);
        });
    });
}


