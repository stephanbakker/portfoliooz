'use strict';

const nconf = require('nconf');
const config = require('../../config/config');
const datastore = require('../../db/datastore');
const Flickr = require('flickrapi');
const flickrOptions = config.getFlickrOptions();

const flickrGetSets = require('./flickr-update-sets');

module.exports = update;

function update() {
    console.log('start updating pages from flickr');

    return pFlickrFetchCollectionTree()
        .then(mapPages)
        .then(function (sets){
            return flickrGetSets(sets);
        })
        .then(photoSets => {
            return datastore.updatePages(photoSets, 'photo');
        })
        .catch(err => {
            throw new Error(err);
        });

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
                    reject('Error fetching collection tree', err);
                }
                resolve(result);
            });
        });
    });
}

function mapPages(flickrData) {
    const set = flickrData.collections.collection[0].set;

    return set.map(set => {
        return {
            title : set.title,
            id: set.id,
            date: Date.now()
        };
    });
}


