var http = require('http');


function test_request(options, data, cb) {
	console.log("data to send:"+data);
	var req = http.request(options, function(res) {
		console.log("Status Code: "+res.statusCode);
		console.log("Headers: "+JSON.stringify(res.headers));
		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			console.log("chunk: "+chunk);
		});
		res.on("end", function() {
			console.log("done");
		});
	});
	if (data)
		req.write(data+"\n");
	req.end();
};

// Hello world
test_request({
	hostname: "localhost",
	port: "8080",
	path: "/hw",
	method: "GET"
	});
	
// Test gif data submit
test_request({
	hostname: "localhost",
	port: "8080",
	path: "/g/admin/new",
	method: "POST",
	headers: {"Content-Type": "application/json" }
	}, '{ "url": "i.imgur.com/32urfw.gif", "tags":["happy"]}');