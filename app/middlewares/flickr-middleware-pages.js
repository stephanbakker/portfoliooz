'use strict';

// 1. TODO use mongo for updating flickr info, using expiry date
var nconf = require('nconf');
var Flickr = require('flickrapi');
var flickrOptions = require('../../config/config').flickrOptions;

module.exports = {
   pages: pages
};

var cache;

function pages(req, res, next) {
    pFlickrFetchCollectionTree()
        .then(mapPages)
        .then(photoPages => {
            req.photoPages = photoPages;
            req.pages = req.pages.concat(req.photoPages);
            next();
        })
        .catch(err => {
            next(err)
        })
}

function pFlickrFetchCollectionTree() {
    return new Promise((resolve, reject) => {
        if (cache) {
            resolve(cache);
        } else {
            Flickr.authenticate(flickrOptions, function(err, flickr) {
                flickr.collections.getTree({
                    api_key: flickrOptions.api_key,
                    user_id: nconf.get('FLICKR_USER_ID'),
                    collection_id: '138616365-72157663941826382'
                }, function (err, result) {
                    if (err) {
                        reject('error updating mongo', err);
                    }
                    cache = result;
                    resolve(result);
                });
            });
        }
    });
}

function mapPages(flickrData) {
    return flickrData.collections.collection[0].set.map(set => {
        return {name : set.title, id: set.id};
    });
}
