'use strict';
const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const getContentPages = require('./update-content-pages');
const config = require('../../config/config');
const React = require('react');

const reactPhotos = require('../dist/photos/photos.js');
const photos = React.createFactory(reactPhotos);

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

    if (!req.page) {
        return res.sendStatus(404);
    }

    let pageType = req.page.type;

    res.render(pageType, {
        pages: req.pages,
        section: req.page.title,
        content: req.page.html,
        photosHtml: React.renderToString(photos({photos: req.page.photos})),
        photos: JSON.stringify(req.page.photos),
        date: new Date(req.page.photosDate)
    });

}

function update(req, res, next) {
    getContentPages()
        .then(pages => Promise.all(pages.map(pMongoPageUpdate)))
        .then(value => res.end('Pages updated: ' + value))
        .catch(err => {
            res.sendStatus(500, err);
            console.log('Error updating pages (500)', err);
        });
}

function pMongoPageUpdate(pageObj) {
    return new Promise(function (resolve, reject) {
        Page.findOneAndUpdate(
            {title: pageObj.title}, 
            {html: pageObj.html || ''}, 
            {upsert:true}, 
            (err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve('saved content page: ' + doc.title);
            }
        );
    });
}

