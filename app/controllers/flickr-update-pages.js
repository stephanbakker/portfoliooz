'use strict';

const mongoose = require('mongoose');
const PhotoPage = mongoose.model('PhotoPage');

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
            {title: pageObj.title, date: pageObj.date},
            {'upsert':true, 'new': true},
            function(err, photoPage){
                if (err) {
                    reject(err);
                }
                console.log('updated %s to DB', photoPage.title);
                resolve(photoPage);
            });
    });
}

function mapPages(flickrData) {
    return flickrData.collections.collection[0].set.map(set => {
        return {
            title : set.title,
            id: set.id,
            date: Date.now()
        };
    });
}
