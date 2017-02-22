'use strict';
import {updateContentPages} from './update-pages.factory';
import flickrUpdate from './flickr-update-pages';

module.exports = () => Promise.all([updateContentPages(), flickrUpdate()]);
