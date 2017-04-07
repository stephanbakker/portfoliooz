import datastore from '../db/datastore';
import getContentPages from './update-content-pages';

// DI
const updateContentPages =
        updateContentPagesFactory
            .bind(null, getContentPages, datastore.updatePages, console);

export {updateContentPagesFactory, updateContentPages};

function updateContentPagesFactory(getContentPages, updatePages, logger) {
  return getContentPages()
    .then(pages => updatePages(pages, 'content'))
    .then(data => {
      const updated = data.content.map(page => page.title).join(', ');
      return logger.log('Pages updated from github: %s (%s)', updated, new Date().toUTCString());
    })
    .catch(err => {
      logger.warn('Error fetching pages from github', err);
    });
}
