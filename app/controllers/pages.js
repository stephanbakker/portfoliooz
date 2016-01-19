'use strict';
const mongoose = require('mongoose');
const Page = mongoose.model('Page');

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
    var pages = [{name: 'aap', html: '<h1>aap take 2</h1>'}, {name: 'noot', html: '<h1>noot</h2>'}];

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

    Promise.all(promises)
        .then(function (data) {
            res.send(data.join(' '));
        })
        .catch(function (err) {
            res.sendStatus(500, err);
        });
    
}

