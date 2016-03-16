import router from '../src/modules/router';
import pages from '../app/middlewares/pages-middleware';
import updateContent from '../app/controllers/update-content-pages';

module.exports = (app) => {
    app.get('*', pages, router);

    app.post('/update-pages', updateContent);
}
