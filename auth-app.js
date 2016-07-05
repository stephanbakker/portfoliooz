// usage:
// $ node auth-app, will try to authenticate
// and will allow to enter this authorize key provided by Flickr
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
