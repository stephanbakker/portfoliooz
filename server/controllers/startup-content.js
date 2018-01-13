'use strict';
import {updateContentPages} from './update-pages.factory';
import flickrUpdateImages from './flickr/flickr-update-images';

module.exports = function startupContent() {
  return Promise.all([updateContentPages(), flickrUpdateImages()]);
};
