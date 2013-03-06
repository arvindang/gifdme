// Gifdme db code
// Author: Sean Muron
// Last modified: 3/6/13

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/gifdme'; 



var dbclient; 
mongo.Db.connect(mongoUri, function(err, p_client) {
	dbclient = p_client;
});


exports.recordUser = function(user, cb) {
	dbclient.collection('users', function(err, collection) {
		collection.update({'user':user},{'user':user}, {upsert: true} function(err, docs) {
			if (err) {
				console.log(err);
				cb(false); // tell express handler it failed
			} else {
				cb(true); // tell express it succeeded
			}
		});
	});
};

exports.countUsers = function(cb) {
	dbclient.collection('users', function(err, collection) {
		collection.count(function(r) {
			cb(r);
		});
	});
}

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

exports.deleteGif = function(url, cb) {
	dbclient.collection('gifs', function(err, collection) {
		collection.delete({'url':url}, function(err, resp) {
			if (err) {
				console.log(err);
				cb(false);
			} else {
				cb(true);
			}
		});
	});
};

exports.findByTagSortUses = function(tag, pos, count, cb) {
	dbclient.collection('gifs', function(err, collection) {
		collection.find( {'tags':[tag]}, {'skip':pos,'limit':count, 'sort':'uses'}).toArray(function(err, docd) {
			if (err) {
				console.log("Error with findByTag:"+err);
				cb(null);
			} else {
				cb(docd);
			}
		});
	});
}

// todo: sort by uses in tweets
exports.findByTag = function(tag, pos, count, cb) {
	dbclient.collection('gifs', function(err, collection) {
		collection.find( {'tags':[tag]}, {'skip':pos,'limit':count}).toArray(function(err, docd) {
			if (err) {
				console.log("Error with findByTag:"+err);
				cb(null);
			} else {
				cb(docd);
			}
		});
	});
}
