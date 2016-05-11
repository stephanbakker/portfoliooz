const Flickr = require('flickrapi');
const flickrOptions = require('../config/config').getFlickrOptions();

module.exports = pFlickrAuthenticate;

function pFlickrAuthenticate() {
    return new Promise((resolve, reject) => {
        Flickr.authenticate(flickrOptions, function(err, flickr) {
            if (err) {
                reject('Error authenticating for Flickr', err);
            }

            resolve(flickr);
        });
    });
}
