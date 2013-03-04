var nano = require('nano')('http://localhost:5984');

var gifs = nano.use('gifs');
var tags = nano.use('tags');
	
exports.insertGif = function(gif, url, cb) {
	gifs.insert(gif,url,function(err,body,head) {
		if (err) {
			console.log(err);
			cb(false);
		} else {
			cb(true);
		}
	});
};

exports.insertTag = function(tag, obj, cb) {
	gifs.insert(obj,tag,function(err,body,head) {
		if (err) {
			console.log(err);
			cb(false);
		} else {
			cb(true);
		}
	});
};

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