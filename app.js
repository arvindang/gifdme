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

app.get('/hw', function(req, res) {
	res.send('Hello World!');
});

function getGifId(id) {
	return {error:"|||||||||||)"};
}

app.get('/g/special/randomTop', function(req,res) {
	res.send( JSON.serialize(temp_gifs[0]) ); // TODO: use random index of view instead
});

/*
app.get('/g/query/:q', function(req,res) {
	// database magic goes here
	// return first gif & maybe query identifier
	res.send(temp_gifs[0]);
});

app.get('/g/cursor/:cur/:pos', function(req, res) {
	res.send(temp_gifs[req.pos+1]); // get crunk
});

app.get('/g/:id', function(req, res) {
	var obj = getGifId(req.id);
	res.send(JSON.serialize(obj));
});

app.get('/g/:id/next', function(req,res) {
	var obj = getGifId(req.id+1); 
	res.send(JSON.serialize(obj));
});

app.get('/', function(req,res) {
	//res.render('index'); // haml
});

app.get('/new', function(req,res) {
	//res.render('new')
});
*/


// test db functions
app.get('/dbtest/insert', function(req,res) {
	// TODO: add body parser
	db.insertGif({tags: ['happy']},"http://i.imgur.com/asdf12",function(db_result) {
		console.log("dbresult:"+db_result);
		if (db_result) {
			res.send("Yay!");
		} else {
			res.send("Nooo!");
		}
	});
});

app.listen(8080);
console.log("Listening on 8080.");