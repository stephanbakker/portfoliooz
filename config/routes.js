const fs = require('fs');
const mongo = require('../db/mongodb');
const devData = require('../dev/pages.json');
const markdown = require('markdown').markdown;

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home', {pages: devData.pages});
    });

    app.get('/:page', function (req, res) {
        fs.readFile('./data/markdown/cv.md', 'utf8', render);
        

        function render(err, data) {
            if (err) {
                throw (err);
            }

            res.render('work', {
                pages: devData.pages,
                section: req.params.page,
                content: markdown.toHTML(data)
            });
        }

    });

    app.get('/admin/pages', function (req, res) {
        mongo.getPages(function (result) {
            res.send(result); 
        });
    });

    app.get('/admin/addpages', function (req, res) {
        mongo.insertPage(function (result) {
            console.log('static page inserted');
            res.redirect('/admin/pages');
        });
    });

    app.post('/content-update', function (req, res) {
        console.log(req.body);
        res.send(JSON.stringify(req.body));
    });
}
