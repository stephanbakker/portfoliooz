const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const middlewares = require('../app/middlewares/pages-middleware.js');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(middlewares.error);

    app.set('views', './app/views');

    app.engine('.hbs', expressHandlebars({
        layoutsDir: './app/views/layouts',
        partialsDir: './app/views/partials',
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');
};

