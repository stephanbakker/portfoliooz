'use strict';

var nconf = require('nconf');
var Flickr = require('flickrapi');
var flickrOptions = require('../../config/config').flickrOptions;

// db
const mongoose = require('mongoose');
const PhotoSet = mongoose.model('PhotoSet');

module.exports = updateSets;

function updateSets(sets) {
    console.log('start updating sets to db. Sets: ', sets);

    pFlickrAuthenticate()
        .then(flickr => {
            let pFlickrGetSet = flickrGetSetPromise(flickr);
            return Promise.all(sets.map(pFlickrGetSet));
        })
        .then(promisedSets => {
            console.log('promised sets', promisedSets.map(set => set.title).join(', '));
           return Promise.all(promisedSets.map(updateInDB));
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
        })
    });
}

function flickrGetSetPromise(flickr) {
    return function(set) {
        return new Promise((resolve, reject) => {
            flickr.photosets.getPhotos({
                photoset_id: set.id,
                api_key: nconf.get('FLICKR_API_KEY'),
                user_id: nconf.get('FLICKR_USER_ID'),
                extras: 'url_sq, url_t, url_s, url_m, url_o'
            }, function (err, result) {
                // TODO more fine grained err handling
                // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
                if (err) {
                    reject(err);
                }
                console.log('fetched set name: %s', result.photoset.title);
                resolve(result.photoset);
            });
        });
    }
}

function updateInDB(set) {
    console.log('saving sets to DB', set);
    return new Promise((resolve, reject) => {
        PhotoSet.findOneAndUpdate(
            {setId: set.id}, 
            {photos: set.photo, title: set.title},
            {'upsert': true, 'new': true},
            function(err, doc){
                if (err) {
                    reject(err);
                }
                console.log('saved set id:%s', doc);
                resolve(doc);
            }
        );
    })
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
