const config = require('../config/config');
import flickrUpdateImages from '../controllers/flickr/flickr-update-images';

export {promiseAllPages, checkExpiresPhotos};

function promiseAllPages(datastore) {
  return new Promise((resolve, reject) => {
    const pages = datastore.getPages();

    if (pages) {
      resolve(pages);
    } else {
      reject('no pages found');
    }
  });
}

function checkExpiresPhotos(datastore) {
  const savedDate = datastore.getSaveDate('photo');
  if (savedDate &&
    (Date.now() - savedDate > config.flickrExpireTime)) {
    flickrUpdateImages();
  }
}
