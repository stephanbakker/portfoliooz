'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const config = require('../../config/config');

module.exports = page;

function page(req, res, next) {
    promisePage(req.params.page)
        .then(data => {
            req.page = data;

            next();
        })
        .catch(err => {
            next(err);
        });
};

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
