// module dependencies
const nconf = require('nconf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const datastore = require('./server/db/datastore');

nconf
   .env()
   .file({file: './server/config/env.json'});

// app parts
require('./server/config/express')(app);
require('./server/config/routes')(app);


// after conf stuff
const startupContent = require('./server/controllers/startup-content');

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
