'use strict';

const mongoose = require('mongoose');
const Page = mongoose.model('Page');

const config = require('../../config/config');
const nconf = require('nconf');
const Flickr = require('flickrapi');
const flickrOptions = require('../../config/config').flickrOptions;

const flickrUpdateSets = require('./flickr-update-sets');

module.exports = update;

function update() {
    console.log('start updating pages from flickr');

    pFlickrFetchCollectionTree()
        .then(mapPages)
        .then(function (sets){
            flickrUpdateSets(sets);
            return sets;
        })
        .then(photoSets => Promise.all(photoSets.map(pMongoPhotoPageUpdate)))
        .catch(err => {
            throw new Error(err)
        })

}

function pFlickrFetchCollectionTree() {
    return new Promise((resolve, reject) => {
        Flickr.authenticate(flickrOptions, function(err, flickr) {
            if (err) {
                reject('Error authenticating in Flickr', err);
            }

            flickr.collections.getTree({
                api_key: nconf.get('FLICKR_API_KEY'),
                user_id: nconf.get('FLICKR_USER_ID'),
                collection_id: config.flickr_collection_id
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}

function pMongoPhotoPageUpdate(photoSet) {
    return new Promise((resolve, reject) => {
        Page.findOneAndUpdate(
            {photoSetId: photoSet.id},
            {
                title: photoSet.title,
                photosDate: photoSet.date,
                type: 'photo'
            },
            {'upsert': true, 'new': true},
            (err, set) => {
                if (err) {
                    reject(err);
                }
                resolve(set);
            });
    });
}

function mapPages(flickrData) {
    const set = flickrData.collections.collection[0].set;
    console.log('flickr set to update: ', set);

    return set.map(set => {
        return {
            title : set.title,
            id: set.id,
            date: Date.now()
        };
    });
}
