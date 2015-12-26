const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.engine('.hbs', expressHandlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');
};

