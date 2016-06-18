module.exports = {
    promiseAllPages,
    checkExpiresPhotos
};

function promiseAllPages(datastore) {
    return new Promise((resolve, reject) => {
        const pages = datastore.getPages();

        if (pages) {
            return resolve(pages);
        } else {
            reject('no pages found');
        }
    });
}

function checkExpiresPhotos(datastore) {
    const savedDate = datastore.getSaveDate('photo');
    if (savedDate && 
            (Date.now() - savedDate > config.flickr_expire_time)) {
        flickrUpdatePages();
    }
}
