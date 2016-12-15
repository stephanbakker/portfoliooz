'use strict';
const nconf = require('nconf');

import datastore from '../db/datastore';
import flickrAuthenticate from './flickr-authenticate';
import flickrGetSets from './flickr-update-sets';

export default flickrUpdate;

function flickrUpdate() {
  console.log('start updating pages from flickr');

  return flickrAuthenticate()
    .then(pFlickrGetSetList)
    .then(mapPages)
    .then(flickrGetSets)
    .then(photoSets => datastore.updatePages(photoSets, 'photo'));
}

function pFlickrGetSetList(flickr) {
  return new Promise((resolve, reject) => {
    /* eslint-disable camelcase */
    flickr.photosets.getList({
      api_key: nconf.get('FLICKR_API_KEY'),
      user_id: nconf.get('FLICKR_USER_ID'),
      nojsoncallback: 1
      /* eslint-enable camelcase */
    }, (err, result) => {
      if (err) {
        reject('Error "flickr.photosets.getList": ' + err);
      } else {
        resolve(result);
      }
    });
  });
}

function mapPages(flickrData) {
  const sets = flickrData.photosets.photoset;

  return sets.map(set => {
    return {
      title: set.title._content,
      id: set.id,
      date: Date.now()
    };
  });
}

