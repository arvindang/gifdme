// Gifdme main app
// Code by: S. Muron
// Last changed: 3/4/13
var db = require('./db.js');
var express = require('express');
var app = express();

// configure the app
app.use(express.static(__dirname + '/public') );
app.use('/img', express.static(__dirname + '/public/img') );
app.use('/touch-icons', express.static(__dirname + '/public/touch-icons') );
app.use(express.bodyParser());
//app.engine('haml', r);
// middleware goes here

temp_gifs = [
	{
		url: 'http://i.imgur.com/d7rshs',
		tags: ['happy', 'laugh']
	},
	{
		url: 'http://i.imgur.com/d7rshs',
		tags: ['happy', 'smile']
	}
];

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
app.get('/g/fetch/tag/:tag/:pos', function(req,res) {
	db.findByTag(req.tag, req.pos, function(gif) {
		if (gif) {
			res.send(gif);
		} else {
			res.send("error");
		}
	});
});

app.get('/g/flag/:id', function(req,res) {
	res.send('not implemented');
});



app.get('/g/special/randomTop', function(req,res) {
	// FIND BY SUPER COOL QUERY
	// then grab a random index and dump it out
	res.send("not implemented");
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
//app.post('/g/admin/delete')

app.listen(8080);
console.log("Listening on 8080.");