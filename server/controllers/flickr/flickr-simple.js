const fetch = require('node-fetch');

const {
  mapTags,
  titleToRoute,
  generateFlickrGetListUrl,
  generateFlickrGetPhotosUrl
} = require('./flickr-util');

module.exports = {
  getSetList,
  mapSetList,
  getSets,
  mapToPhotoSet,
  logSetsToUpdate,
  mapPhotoSets,
  filterOutSetsToIgnore
};

function getSetList() {
  const url = generateFlickrGetListUrl();
  return fetch(url).then(res => res.json());
}

function mapSetList(flickrSetList) {
  const sets = flickrSetList.photosets.photoset;
  return sets.map(set => {
    return {
      title: set.title._content,
      id: set.id,
      date: Date.now()
    };
  });
}

function getSets(setList) {
  return Promise.all(
    setList.map(set => getSet(set))
  );
}

function logSetsToUpdate(sets) {
  console.log(
    'found sets to update: %s (%s)',
    sets.map(set => set.title).join(', '),
    new Date().toUTCString()
  );
  return sets;
}

function getSet(set) {
  const url = generateFlickrGetPhotosUrl(set);
  return fetch(url).then(res => res.json());
}

function mapToPhotoSet(sets) {
  return sets.map(set => set.photoset);
}

function mapPhotoSets(sets) {
  return sets.map(set => ({
    id: set.id,
    title: titleToRoute(set.title),
    photos: mapTags(set.photo)
  }));
}

function filterOutSetsToIgnore(sets) {
  return sets.filter(set => set.title !== 'niet-op-site');
}
