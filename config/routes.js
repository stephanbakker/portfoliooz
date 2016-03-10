import router from '../src/modules/router';
import pages from '../app/middlewares/pages-middleware';

export default  function (app) {
    app.get('*', pages, router);
}
