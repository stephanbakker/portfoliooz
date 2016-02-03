'use strict';

var nconf = require('nconf');

module.exports = {
    appName: 'portfoliooz',
    db: 'mongodb://localhost/marit',
    CONTENTS_URL: 'https://api.github.com/repos/stephanbakker/md-content/contents',
    flickr_collection_id: '138616365-72157663941826382',
    
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
