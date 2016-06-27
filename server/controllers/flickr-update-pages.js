'use strict';

const nconf = require('nconf');
const config = require('../config/config');

import datastore from '../db/datastore';

import flickrAuthenticate from './flickr-authenticate';

import flickrGetSets from './flickr-update-sets';

export default flickrUpdate;

function flickrUpdate() {
    console.log('start updating pages from flickr');

    return flickrAuthenticate()
        .then(pFlickrFetchCollectionTree)
        .then(mapPages)
        .then(flickrGetSets)
        .then(photoSets => datastore.updatePages(photoSets, 'photo'))
        .catch(err => {
            console.log('something wrong with flickrUpdate', err);
            throw new Error(err);
        });

}

function pFlickrFetchCollectionTree(flickr) {
    return new Promise((resolve, reject) => {
        flickr.photosets.getList({
            api_key: nconf.get('FLICKR_API_KEY'),
            user_id: nconf.get('FLICKR_USER_ID'),
        }, (err, result) => {
            if (err) {
                reject('Error fetching collection tree', err);
            }
            resolve(result);
        });
    });
}

function mapPages(flickrData) {
    const set = flickrData.photosets.photoset;

    return set.map(set => {
        return {
            title : set.title,
            id: set.id,
            date: Date.now()
        };
    });
}

