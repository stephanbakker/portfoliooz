'use strict';

const updatePages = require('./pages');
const flickrUpdate = require('./flickr-update-pages');

module.exports = () => {
    return Promise.all([updatePages(), flickrUpdate()]);
}
