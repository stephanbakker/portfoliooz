// module dependencies
const nconf = require('nconf');
const mongoose = require('mongoose');

const app = require('express')();

const config = require('./config/config');
const pageModel = require('./app/models/page');

const port = process.env.PORT || 3000;

console.log('env', nconf.get('MONGOLAB_URI'));

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

    return mongoose.connect(config.db, options).connection;
}
