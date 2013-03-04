// test mongoose
var assert = require('assert');
var mongo = require('mongodb');

 var client = new mongo.Db('test', new mongo.Server("127.0.0.1", 27017, {}), {w: 1}),
        test = function (err, collection) {
          collection.insert({a:2}, function(err, docs) {

            collection.count(function(err, count) {
              assert.ok(0<count);
            });

            // Locate all the entries using find
            collection.find().toArray(function(err, results) {
              assert.ok(0<results.length);
              assert.ok(results[0].a === 2);

              // Let's close the db
              client.close();
            });
          });
        };

    client.open(function(err, p_client) {
      client.collection('test_insert', test);
      
    });