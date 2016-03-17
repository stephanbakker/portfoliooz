import router from '../../shared/modules/router';
import pages from '../middlewares/pages-middleware';
import updateContent from '../controllers/update-content-pages';

module.exports = (app) => {
    app.get('*', pages, router);

    app.post('/update-pages', updateContent);
}
