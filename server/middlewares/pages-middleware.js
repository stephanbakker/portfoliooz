import datastore from '../db/datastore';
import {promiseAllPages, checkExpiresPhotos} from '../db/datastore-utils';
import augmentPageData from './augment-pagedata';

export default pages;

function pages(req, res, next) {
    promiseAllPages(datastore)
        .then(pages => augmentPageData(pages, req, res, next))
        .then(() => checkExpiresPhotos(datastore))
        .catch(next);
}

