'use strict';
import {updateContentPages} from './update-pages.factory';
import flickrUpdate from './flickr-update-pages';

module.exports = function startupContent() {
  return Promise.all([updateContentPages(), flickrUpdate()]);
};
