const nconf = require('nconf');
const Flickr = require('flickrapi');

// this is run from root, so needs './server'
nconf
    .env()
    .file({file: './server/config/env.json'});

const flickrOptions = require('./server/config/config').getFlickrOptions();

Flickr.authenticate(flickrOptions, function(err, flickr) {
    if (err) {
        console.log('Oops, authenticating did not work', err);
    } else {
        console.log('flickr', flickr);
        return flickr;
    }
});
