'use strict';

// 1. TODO use mongo for updating flickr info, using expiry date

var nconf = require('nconf');
var Flickr = require('flickrapi');
var flickrOptions = require('../../config/config').flickrOptions;

module.exports = page;

var cache = {};

// TODO this can be done way better... lodash?
function page(req, res, next) {
    var pageName = req.params.page;

    if (req.photoPages && pageName && !req.page) {
        let photoPage = req.photoPages.find(function (page) {
            return page.title = pageName;
        });

        if (photoPage) {
            pFlickrGetSet(photoPage.id)
                .then(function (data) {
                    req.page = {
                        html: pageName,
                        data: JSON.stringify(data)
                    };
                    next();
                })
                .catch(err => {
                    next(err);
                });
        } else {
            next();
        }

    } else {
        next();
    }
}

function pFlickrGetSet(id) {
    return new Promise((resolve, reject) => {
        if (cache.id) {
            resolve(cache.id);
        } else {
            Flickr.authenticate(flickrOptions, function(err, flickr) {
                flickr.photosets.getPhotos({
                    api_key: flickrOptions.api_key,
                    photoset_id: id,
                    user_id: nconf.get('FLICKR_USER_ID'),
                    extras: 'url_sq, url_t, url_s, url_m, url_o'
                }, function (err, result) {
                    // TODO more fine grained err handling
                    // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
                    if (err) {
                        reject(err);
                    }
                    cache.id = result.photoset.photo;
                    resolve(cache.id);
                });
            });
        }
    });
}

