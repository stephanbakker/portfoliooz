'use strict';
const datastore = require('../db/datastore');
const getContentPages = require('./update-content-pages');

module.exports = update;

function update(req, res, next) {
    return getContentPages()
        .then(pages => {return datastore.updatePages(pages, 'content');})
        .then(value => {
            if (res) {
                res.end('Pages updated: ' + value.length);
            } else {
                console.log('Pages updated: ' + value.length);
            }
        })
        .catch(err => {
            res && res.sendStatus(500, err);
            console.log('Error updating pages (500)', err);
        });
}

