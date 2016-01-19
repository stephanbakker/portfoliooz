const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('views', './app/views');

    app.engine('.hbs', expressHandlebars({
        layoutsDir: './app/views/layouts',
        partialsDir: './app/views/partials',
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');
};

