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
        try {
          res.status(200).send('Pages updated on request: ' + updated);
        } catch (e) {
          console.log(e);
          throw new Error(e);
        }
      } else {
        console.log('Pages updated: %s', updated);
      }
    })
    .catch(err => {
      if (res) {
        res.status(500).send('error fetching pages', err);
      }
      console.log('Error updating pages (500)', err);
    });
}

