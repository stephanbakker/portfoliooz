'use strict';
const nconf = require('nconf');

import flickrAuthenticate from './flickr-authenticate';

export default updateSets;

function updateSets(sets) {
    console.log('start updating sets to DB');

    return flickrAuthenticate()
        .then(flickr => {
            console.log('flickr authenticated => get sets:');
            return Promise.all(sets.map(set => flickrGetSetPromise(flickr, set)));
        })
        .then(sets => {
            console.log('found sets to update: ', sets.map(set => set.title).join(', '));
            return mapPhotoSets(sets);
        })
        .catch(err => {
            throw new Error(err);
        });
}

function flickrGetSetPromise(flickr, set) {
    return new Promise((resolve, reject) => {
        flickr.photosets.getPhotos({
            photoset_id: set.id,
            api_key: nconf.get('FLICKR_API_KEY'),
            user_id: nconf.get('FLICKR_USER_ID'),
            privacy_filter: 2, // friends, private is ignored somehow
            extras: 'url_sq, url_t, url_s, url_m, url_o, url_l, tags',
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
}

function mapPhotoSets(sets) {
    return sets.map(photoset => {
        return {
            id: photoset.id,
            title: photoset.title,
            tags: photoset.tags,
            photos: photoset.photo
        };
    });
}
