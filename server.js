// module dependencies
import nconf from 'nconf';
import mongoose from 'mongoose';

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// install models
import './app/models/page';

nconf
   .env()
   .file({file: './config/env.json'});

import config from './config/config';

// app parts
import appExpress from './config/express';
import appRoutes from './config/routes';
// decorate app
appExpress(app);
appRoutes(app);

// start server
connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', listen);

function listen() {
    console.log('listening on port %', port);
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
