// module dependencies
const nconf = require('nconf');
const express = require('express');

import datastore from './db/datastore';

// this is run from root, so needs './server'
nconf
    .env()
    .file({file: './server/config/env.json'});

// app parts
const app = express();
const port = process.env.PORT || 3000;
require('./config/express')(app);
require('./config/routes')(app);


// after conf stuff
const startupContent = require('./controllers/startup-content');

// pull in pages
startupContent()
    .then(listen)
    .catch(err => {
        throw new Error('Error starting up server', err);
    });

function listen() {
    app.listen(port, () => {
        console.log('express server started on port: ', port);
    });
}
