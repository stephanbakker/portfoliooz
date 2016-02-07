// module dependencies
const nconf = require('nconf');
const mongoose = require('mongoose');

const app = require('express')();
const port = process.env.PORT || 3000;

// install models
require('./app/models/page');

nconf
   .env()
   .file({file: './config/env.json'});

const config = require('./config/config');

// decorate app
require('./config/express')(app);
require('./config/routes')(app);

// start server
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', listen);

function listen() {
    app.listen(port);
}

function connectDb() {
    // TODO find out about those
    var options = {
        server: {
           sockeOptions: {
               keepAlive: 1
            }
        }
    };

    // handle db
    var mongoDBEnv = nconf.get('MONGOLAB_URI');
    config.db = mongoDBEnv || config.db;
    console.log('mongoURI', mongoDBEnv);

    return mongoose.connect(config.db, options).connection;
}
