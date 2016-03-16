'use strict';

const updatePages = require('./pages');
const flickrUpdate = require('./flickr-update-pages');

console.log('2. startup content');
module.exports = () => {
    return Promise.all([updatePages(), flickrUpdate()]);
}
