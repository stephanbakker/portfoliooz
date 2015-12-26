var nconf = require('nconf');
var express = require('express');
var bodyParser = require('body-parser');

var Flickr = require('flickrapi');

nconf.argv()
   .env()
   .file({file: './env.json'});

console.log(nconf.get('FLICKR_USER_ID'));

var flickrOptions = {
    api_key: 'a26c0bc6e99fe0da91f3fd06e702e36c',
    secret: 'd3917e7a6817b4f2',
    permissions: 'read',
    force_auth: true,

    user_id: nconf.get('FLICKR_USER_ID'),
    access_token: nconf.get('FLICKR_ACCESS_TOKEN'),
    access_token_secret: nconf.get('FLICKR_ACCESS_TOKEN_SECRET')
};

function setupServer(flickr, next) {
    var app = express();

    // parse application/json
    app.use(bodyParser.json())

    //flickr.proxy(app, '/service/rest');

    var server = app.listen(3000, next(app));

}

Flickr.authenticate(flickrOptions, authenticated);

function authenticated(err, flickr) {
    setupServer(flickr, function (app) {
       
        return function (err) {
            app.get('/', function (req, res) {
                flickr.photos.search({
                    api_key: flickrOptions.api_key,
                    user_id: nconf.get('FLICKR_USER_ID'),
                    privacy_filter: 5
                }, function (err, result) {
                    res.send(result);
                });
            });
        }
               
    });
}


