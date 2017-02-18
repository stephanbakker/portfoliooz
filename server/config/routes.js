const bodyParser = require('body-parser');

import router from '../../shared/modules/router';
import pages from '../middlewares/pages-middleware';
import updatePages from '../controllers/pages.js';
import githubMiddleware from '../middlewares/github-middleware';

const jsonParser = bodyParser.json();

module.exports = app => {
  app.get('*', pages, router);

  app.post('/update-pages', jsonParser, githubMiddleware, updatePages);
};
