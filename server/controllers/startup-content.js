'use strict';
import updatePages from './pages';
import flickrUpdate from './flickr-update-pages';

module.exports = () => Promise.all([updatePages(), flickrUpdate()]);
