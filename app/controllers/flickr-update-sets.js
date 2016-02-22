'use strict';

var nconf = require('nconf');
var Flickr = require('flickrapi');
var flickrOptions = require('../../config/config').flickrOptions;

// db
const mongoose = require('mongoose');
const Page = mongoose.model('Page');

module.exports = updateSets;

function updateSets(sets) {
    console.log('start updating sets to DB');

    pFlickrAuthenticate()
        .then(flickr => {
            const pFlickrGetSet = flickrGetSetPromise(flickr);
            return Promise.all(sets.map(pFlickrGetSet));
        })
        .then(promisedSets => {
            console.log('found sets to update: ', promisedSets.map(set => set.title).join(', '));
            return Promise.all(promisedSets.map(updateInDB));
        })
        .then(updatedSets => {
            console.log('updated in DB: ', updatedSets.map(set => set.title).join(', '));
        })
        .catch(err => {
            throw new Error(err);
        });
}

function pFlickrAuthenticate() {
    return new Promise((resolve, reject) => {
        Flickr.authenticate(flickrOptions, function(err, flickr) {
            if (err) {
                reject(err);
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
                    reject(err);
                }
                resolve(result.photoset);
            });
        });
    };
}

function updateInDB(set) {
    return new Promise((resolve, reject) => {
        Page.findOneAndUpdate(
            {photoSetId: set.id},
            {
                title: set.title,
                photos: set.photo
            },
            {'new': true},
            (err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            }
        );
    });
}

function mapPhotoSets(sets) {
    return sets.map(set => {
        let photoset = set.photoset;
        return {
            id: photoset.id,
            name: photoset.title,
            photos: photoset.photo
        };
    });
}
