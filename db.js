// Gifdme db code
// Author: Sean Muron
// Last modified: 3/4/13

var mongo = require('mongodb');

var client = new mongo.Db('gifdme', new mongo.Server("127.0.0.1", 27017, {}), {w: 1});

/*
client.open(function(err, p_client) {
	client.collection('gifs', function(err, collection) {
	
	});
});
*/

var dbclient; 
client.open(function(err, p_client) {
	dbclient = p_client;
});


exports.insertGif = function(gif, url, cb) {
		dbclient.collection('gifs', function(err, collection) {
			collection.insert(gif, function(err, docs) {
				if (err) {
					console.log(err);
					cb(false); // tell express handler it failed
				} else {
					cb(true); // tell express it succeeded
				}
			});
		});
};

exports.insertTag = function(tag, name, cb) {
		dbclient.collection('tags', function(err, collection) {
			collection.insert(tag, function(err, docs) {
				if (err) {
					console.log(err);
					cb(false); // tell express handler it failed
				} else {
					cb(true); // tell express it succeeded
				}
			});
		});
};


// todo: sort by uses in tweets
exports.findByTag = function(tag, pos, count, cb) {
		dbclient.collection('gifs', function(err, collection) {

			collection.find( {'tag':[tag]}, {'skip':pos,'limit':count}, function(err, docd) {
				//console.log(docd.nextObject());
				if (err) {
					console.log("Error:"+err);
					cb(null);
				} else {
					console.log("no error");
					//console.log(docd);
					cb(docd);
				}
			});
		});
}
