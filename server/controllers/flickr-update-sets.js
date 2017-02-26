'use strict';
const nconf = require('nconf');

import { titleToRoute } from '../utils/util';
import flickrAuthenticate from './flickr-authenticate';
import { mapTags } from '../utils';

export default updateSets;

function updateSets(sets) {
  console.log('start updating sets to DB');

  return flickrAuthenticate()
    .then(flickr => {
      console.log('flickr authenticated => get sets:');
      return Promise.all(
        sets.map(set => flickrGetSetPromise(flickr, set)));
    })
    .then(sets => {
      console.log('found sets to update: ',
        sets.map(set => set.title).join(', ')
      );
      return mapPhotoSets(sets);
    });
}

function flickrGetSetPromise(flickr, set) {
  return new Promise((resolve, reject) => {
    /* eslint-disable camelcase */
    flickr.photosets.getPhotos({
      photoset_id: set.id,
      api_key: nconf.get('FLICKR_API_KEY'),
      user_id: nconf.get('FLICKR_USER_ID'),
      privacy_filter: 2, // friends, private is ignored somehow
      extras: 'url_sq, url_t, url_s, url_m, url_o, url_l, tags, description',
      nojsoncallback: 1
      /* eslint-ensable camelcase */
    }, (err, result) => {
      // https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
      if (err) {
        reject('Error fetching photoSet: ' + err);
      } else {
        console.log('set fetched', result.photoset.id);
        resolve(result.photoset);
      }
    });
  });
}

function mapPhotoSets(sets) {
  return sets.map(photoset => ({
    id: photoset.id,
    title: titleToRoute(photoset.title),
    photos: mapTags(photoset.photo)
  })).filter(set => set.title !== 'niet op site');
}
