const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017/marit';

module.exports = {
    connect: connect,
    getPages: getPages,
    insertPage: insertPage
};

function connect(callback) {
    MongoClient.connect(URL, callback);
}

function getPages(callback) {
    connect(function(err, db) {
        if (err) {
            throw err;
        }

        db.collection('pages')
            .find()
            .toArray(function (err, result) {
                callback(result);
                db.close();
            });
    });
}


function insertPage(callback) {
   connect(function(err, db) {
        if (err) {
            throw err;
        }

        db.collection('pages').insertOne({
            'name': 'text'
        }, function (err, result) {
            console.log('inserted: ', result);
            db.close();
        });

   });
}
