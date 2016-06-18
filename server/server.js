// module dependencies
const nconf = require('nconf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const datastore = require('./db/datastore');

nconf
   .env()
   .file({file: './config/env.json'});

// app parts
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
