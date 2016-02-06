'use strict';

const mongoose = require('mongoose');
const PhotoPage = mongoose.model('PhotoPage');

const config = require('../../config/config');
const nconf = require('nconf');
const Flickr = require('flickrapi');
const flickrOptions = require('../../config/config').flickrOptions;

const flickrUpdateSets = require('./flickr-update-sets');

module.exports = {
    update: update
};

function update() {
    console.log('start updating pages from flickr');

    pFlickrFetchCollectionTree()
        .then(mapPages)
        .then(function (sets){
            flickrUpdateSets(sets);
            return sets;
        })
        .then(photoPages => Promise.all(photoPages.map(pMongoPhotoPageUpdate)))
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
            }, function (err, result) {
                if (err) {
                    reject(err);
                }
                console.log('result from flickr getTree', result);
                resolve(result);
            });
        });
    });
}

function pMongoPhotoPageUpdate(pageObj) {
    return new Promise(function (resolve, reject) {
        PhotoPage.findOneAndUpdate(
            {id: pageObj.id},
            {name: pageObj.name},
            {'upsert':true, 'new': true},
            function(err, doc){
                if (err) {
                    reject(err);
                }
                console.log('updated', doc);
                resolve(doc);
            });
    });
}

function mapPages(flickrData) {
    console.log('map data', flickrData);

    return flickrData.collections.collection[0].set.map(set => {
        return {name : set.title, id: set.id};
    });
}
