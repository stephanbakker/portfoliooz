const {
  getSetList,
  mapSetList,
  getSets,
  mapToPhotoSet,
  logSetsToUpdate,
  mapPhotoSets,
  filterOutSetsToIgnore
} = require('./flickr-simple');

import datastore from '../../db/datastore';

module.exports = function flickrFetchImages() {
  return getSetList()
    .then(mapSetList)
    .then(getSets)
    .then(mapToPhotoSet)
    .then(mapPhotoSets)
    .then(filterOutSetsToIgnore)
    .then(sets => {
      logSetsToUpdate(sets);
      return sets;
    })
    .then(photoSets => datastore.updatePages(photoSets, 'photo'))
    .catch(err => {
      console.error('Error fetching Flickr Photos', err);
    });
};
