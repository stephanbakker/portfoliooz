// module dependencies
const nconf = require('nconf');
const express = require('express');

// this is run from root, so needs './server'
nconf
  .env();

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
  app.listen(port, 'localhost', () => {
    console.log('express server started on port: ', port);
  });
}
