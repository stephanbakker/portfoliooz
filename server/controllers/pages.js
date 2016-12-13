'use strict';

import datastore from '../db/datastore';
import getContentPages from './update-content-pages';

export default updatePages;

function updatePages(req, res, next) {
  return getContentPages()
    .then(pages => datastore.updatePages(pages, 'content'))
    .then(data => {
      const updated = data.content.map(page => page.title).join(',');
      if (res) {
        res.end('Pages updated on request: %s', updated);
      } else {
        console.log('Pages updated: %s', updated);
      }
    })
    .catch(err => {
      if (res) {
        res.sendStatus(500, err);
      }
      console.log('Error updating pages (500)', err);
    });
}

