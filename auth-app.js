// usage:
// $ node auth-app, will try to authenticate
// and will allow to enter this authorize key provided by Flickr
const nconf = require('nconf');
const Flickr = require('flickrapi');

// Make sure to export stuff on environment, from secret .env
// run $ . secret/.env
// check $ printenv | grep FLICKR

// this is run from root, so needs './server'
nconf
    .env();

const flickrOptions = require('./server/config/config').getFlickrOptions();

Flickr.authenticate(flickrOptions, function(err, flickr) {
    if (err) {
        console.log('Oops, authenticating did not work', err);
    } else {
        console.log('flickr', flickr);
        return flickr;
    }
});
