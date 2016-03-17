'use strict';

var nconf = require('nconf');
var Flickr = require('flickrapi');
var flickrOptions = require('../config/config').getFlickrOptions();

module.exports = updateSets;

function updateSets(sets) {
    console.log('start updating sets to DB');

    return pFlickrAuthenticate()
        .then(flickr => {
            console.log('flickr authenticated => get sets:', sets);
            const pFlickrGetSet = flickrGetSetPromise(flickr);
            return Promise.all(sets.map(pFlickrGetSet));
        })
        .then(sets => {
            console.log('found sets to update: ', sets.map(set => set.title).join(', '));
            return mapPhotoSets(sets);
        })
        .catch(err => {
            throw new Error(err);
        });
}

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

function flickrGetSetPromise(flickr) {
    return (set) => {
        return new Promise((resolve, reject) => {
            flickr.photosets.getPhotos({
                photoset_id: set.id,
                api_key: nconf.get('FLICKR_API_KEY'),
                user_id: nconf.get('FLICKR_USER_ID'),
                extras: 'url_sq, url_t, url_s, url_m, url_o'
            }, (err, result) => {
                // TODO more fine grained err handling
                // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
                if (err) {
                    reject('Error fetching photoSet', err);
                }
                console.log('set fetched', result.photoset.id);
                resolve(result.photoset);
            });
        });
    };
}

function mapPhotoSets(sets) {
    return sets.map(photoset => {
        return {
            id: photoset.id,
            title: photoset.title,
            photos: photoset.photo
        };
    });
}
