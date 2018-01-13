const fetch = require('node-fetch');
const config = require('../../config/config');

const {generateUrl, mapTags, titleToRoute} = require('./flickr-util');

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
  const flickrOptions = config.getFlickrOptions();

  const options = Object.assign({}, flickrOptions, {
    method: 'flickr.photosets.getList'
  });

  const url = generateUrl(options);

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
  const flickrOptions = config.getFlickrOptions();

  const options = Object.assign({}, flickrOptions, {
    method: 'flickr.photosets.getPhotos'
  });

  const extraParams = [
    `photoset_id=${set.id}`,
    'privacy_filter=2', // friends, private is ignored somehow
    'extras=url_sq,url_t,url_s,url_m,url_o,url_l,tags,description'
  ].join('&');

  const url = generateUrl(options);

  const expandedUrl = `${url}&${extraParams}`;

  return fetch(expandedUrl).then(res => res.json());
}

function mapToPhotoSet(sets) {
  return sets.map(set => set.photoset);
}

function mapPhotoSets(sets) {
  return sets.map(photoset => ({
    id: photoset.id,
    title: titleToRoute(photoset.title),
    photos: mapTags(photoset.photo)
  }));
}

function filterOutSetsToIgnore(sets) {
  return sets.filter(set => set.title !== 'niet-op-site');
}
