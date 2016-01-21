'use strict';
const mongoose = require('mongoose');
const Page = mongoose.model('Page');
const getContentPages = require('./update-content-pages');

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

    res.render('content', {
        pages: req.pages,
        section: req.page.page,
        content: req.page.html
    });

}

function update(req, res, next) {
    getContentPages()
        .then(function (pages) {
            let promises = pages.map(function (pageObj) {
        
                return new Promise(function (resolve, reject) {
                    Page.findOneAndUpdate({name: pageObj.name}, {html: pageObj.html}, {upsert:true}, function(err, doc){
                        if (err) {
                            reject(err);
                        }
                        resolve('saved ' + doc.name);
                    });
                });
            });

            return Promise.all(promises);

        })
        .then(function (value) {
            res.end('Pages updated: ' + value);
        })
        .catch(function (err) {
            res.sendStatus(500, err);
            console.log('Error updating pages (500)', err);
        });

}

