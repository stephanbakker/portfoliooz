'use strict';
const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const getContentPages = require('./update-content-pages');
const config = require('../../config/config');

module.exports = {
    index: index,
    content: content,
    update: update
};

function index(req, res) {
    res.render('home', {
        pages: req.pages
    });
}

function content(req, res) {

    let pageType = req.work ? 'work' : 'content';

    if (!req.page) {
        return res.sendStatus(404);
    }

    res.render(pageType, {
        pages: req.pages,
        section: req.page.page,
        content: req.page.html
    });

}

function update(req, res, next) {
    getContentPages()
        .then(function addWorkPages(pages) {
            console.log(pages.concat(config.workPages));
            return pages.concat(config.workPages);
        })
        .then(function (pages) {
            return Promise.all(pages.map(pMongoPageUpdate));
        })
        .then(function (value) {
            res.end('Pages updated: ' + value);
        })
        .catch(function (err) {
            res.sendStatus(500, err);
            console.log('Error updating pages (500)', err);
        });

}

function pMongoPageUpdate(pageObj) {
    return new Promise(function (resolve, reject) {
        Page.findOneAndUpdate({name: pageObj.name}, {html: pageObj.html || ''}, {upsert:true}, function(err, doc){
            if (err) {
                reject(err);
            }
            resolve('saved ' + doc.name);
        });
    });
}

