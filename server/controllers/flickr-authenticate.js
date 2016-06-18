const Flickr = require('flickrapi');
const flickrOptions = require('../config/config').getFlickrOptions();

export default flickrAuthenticate;

function flickrAuthenticate() {
    return new Promise((resolve, reject) => {
        Flickr.authenticate(flickrOptions, function(err, flickr) {
            if (err) {
                reject('Error authenticating for Flickr', err);
            }

            resolve(flickr);
        });
    });
}
