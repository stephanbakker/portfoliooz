'use strict';

var nconf = require('nconf');

module.exports = {
    db: 'mongodb://localhost/marit',
    flickrOptions: {
        permissions: 'write',
        force_auth: true,

        api_key: nconf.get('FLICKR_API_KEY'),
        secret: nconf.get('FLICKR_API_SECRET'),
        user_id: nconf.get('FLICKR_USER_ID'),
        access_token: nconf.get('FLICKR_ACCESS_TOKEN'),
        access_token_secret: nconf.get('FLICKR_ACCESS_TOKEN_SECRET')
    }
};
