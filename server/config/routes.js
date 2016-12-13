import router from '../../shared/modules/router';
import pages from '../middlewares/pages-middleware';
import updatePages from '../controllers/pages.js';

module.exports = app => {
  app.get('*', pages, router);

  app.post('/update-pages', updatePages);
};
