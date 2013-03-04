// Gifdme db code
// Author: Sean Muron
// Last modified: 3/4/13

var mongo = require('mongodb');

var client = new mongo.Db('gifdme', new mongo.Server("127.0.0.1", 27017, {}), {w: 1});


client.open(function(err, p_client) {
	client.collection('gifs', function(err, collection) {
	
	});
});

exports.insertGif = function(gif, url, cb) {
	client.open(function(err, p_client) {
		client.collection('gifs', function(err, collection) {
			collection.insert(gif, function(err, docs) {
				if (err) {
					console.log(err);
					cb(false); // tell express handler it failed
				} else {
					cb(true); // tell express it succeeded
				}
			});
		});
	});	
};

exports.insertTag = function(tag, name, cb) {
	client.open(function(err, p_client) {
		client.collection('tags', function(err, collection) {
			collection.insert(tag, function(err, docs) {
				if (err) {
					console.log(err);
					cb(false); // tell express handler it failed
				} else {
					cb(true); // tell express it succeeded
				}
			});
		});
	});	
};

exports.findByTag = function(tag, cb) {
	client.open(function(err, p_client) {
		client.collection('gifs', function(err, collection) {
			collection.find( { tags: tag }, function(err, docs) {
				if (err) {
					console.log(err);
					cb(null);
				} else {
					cb(docs);
				}
			});
		});
	});
}

/*
var nano = require('nano')('http://localhost:5984');

var gifs = nano.use('gifs');
var tags = nano.use('tags');
	

exports.queryByX = function(params, cb) {
	gifs.view('gifs','by_X',params, function(err,body,head) {
		if (err) {
			console.log(err);
			cb(null);
		} else {
			cb(body);
		}
	});
}

exports.queryByTest = function(pos, cb) {
	// get q result (from cache as needed)
	// get pos
	gifs.view('gifs','by_url',{limit: 1, skip: pos}, function(err,body,head) {
		if (err) {
			console.log(err);
			cb(null);
		} else {
			cb(body);
		}
	});
};

console.log(gifs);	
*/