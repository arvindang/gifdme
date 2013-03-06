// Gifdme main app
// Code by: S. Muron
// Last changed: 3/6/13
var db = require('./db.js');
var express = require('express');
var twitter = require('./twitter.js');
// TODO: request and record the t.co url length (??)
// tweet should have that much room for the link (and one whitespace)

var app = express();

// configure the app
app.use(express.static(__dirname + '/public') );
app.use('/img', express.static(__dirname + '/public/img') );
app.use('/touch-icons', express.static(__dirname + '/public/touch-icons') );
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets') );
app.use(express.bodyParser());
//app.engine('haml', r);
// middleware goes here


// Hello World!
app.get('/hw', function(req, res) {
	res.send('Hello World!');
});

// Tag search
app.get('/g/fetch/tag/:tag', function(req,res) {
	db.findByTag(req.tag, 0, function(gif) {
		console.log(gif);
		if (gif) {
			res.send(gif);
		} else {
			res.send("error");
		}
	});
});
app.get('/g/fetch/tag/:tag/:pos/:count', function(req,res) {
	console.log(req);
	db.findByTag(req.params.tag, req.params.pos, req.params.count, function(gif) {
		if (gif) {
			res.send(gif);
		} else {
			res.send("error");
		}
	});
});

app.post('/g/admin/new', function(req,res) {
	/*
	* Expects JSON:
	* url : string
	* tags : array
	* submitter: string (@xxxxxx)
	*/
	var newGif = req.body;
	newGif.uses = 0; newGif.date = (new Date()).getTime();
	db.insertGif(newGif, newGif.url, function(result) {
		if (result) res.send('ok');
		else res.send('error');
	});
});

app.get('/twauth', function(req,res) {
	twitter.verifyCredentials(function(data) {
        console.log(util.inspect(data));
    })
});
app.post('/t/send', function(req,res) {
	// magic goes here
	
	//db.updateGif uses++
	
	// twitter.updateStatus(req.body.text, function() {
	
	});
	res.send('unimplemented');
});

app.get('/g/admin/delete/:url', function(req,res) {
	// check if logged in as admin 
	// if so: else berate them + increase suspicion vs user/IP (for scaling / security)
	// db.deleteGif(req.url, function(err) {
	// if successful
	// res.send("ok");
	// else minor suspicion vs user/IP
	// }
	res.send("not implemented");
});
app.get('/g/flag/:id', function(req,res) {
	res.send('not implemented');
});
app.get('/g/special/randomTop', function(req,res) {
	// FIND BY SUPER COOL QUERY
	// then grab a random index and dump it out
	res.send("not implemented");
});




app.listen(80);
console.log("Listening on 80.");