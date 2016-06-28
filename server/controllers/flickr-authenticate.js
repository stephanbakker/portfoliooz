const Flickr = require('flickrapi');
const flickrOptions = require('../config/config').getFlickrOptions();

export default flickrAuthenticate;

function flickrAuthenticate() {
    return new Promise((resolve, reject) => {
        console.log(flickrOptions, '111');
        Flickr.authenticate(flickrOptions, function(err, flickr) {
            if (err) {
                reject('Error authenticating for Flickr', err);
            } else {
                resolve(flickr);
            }
        });
    });
}
