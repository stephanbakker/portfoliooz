const nconf = require('nconf');
const port = process.env.PORT || 3000;

const app = require('express')();

console.log('env', nconf.get('MONGOLAB_URI'));

// decorate app
require('./config/express')(app);
require('./config/routes')(app);

// start server
app.listen(port);
console.log('Express app started on port ' + port);
