'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const config = require('../../config/config');

module.exports = page;

function page(req, res, next) {
    promisePage(req.params.page)
        .then(contentPage => {
                console.log('\ncontentPage: ', contentPage);
            if (contentPage) {
                req.page = {
                    html: contentPage.html,
                    title: contentPage.title
                };
            }

            next();
        })
        .catch(err => {
            next(err);
        });
};

function promisePage(pageTitle) {
    return new Promise((resolve, reject) => {
        if (pageTitle) {
            Page.findOne({title: pageTitle}, (err, page) => {
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
