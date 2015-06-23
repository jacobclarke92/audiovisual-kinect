#!/usr/bin/env node

var fs = require('fs');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var httpRequest = require('http-request');
var url = require("url");
var BufferedNetstringStream = require('./netstring').BufferedNetstringStream;
var colors = require('colors/safe');


var portNum = 3000;
var clients = [];

var verbose = true;


var urlRules = [
	['.pde','text/processing'],
	['.png','image/png'],
	['.js','application/javascript'],
	['.html','text/html'],
	['.css','text/css'],
	['.json','text/event-stream'],
	['.xml','text/xml'],

	['.svg','image/svg+xml'],
	['.ttf','application/x-font-ttf'],
	['.otf','application/x-font-opentype'],
	['.woff','application/x-font-woff'],
	['.eot','application/vnd.ms-fontobject'],

	['.ico','image/x-icon']
];


//start doing stream data stuff

function stream(req, res) {
	res.writeHead(200, {
		'Content-Type':  'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection':    'keep-alive'
	});

	clients.push(res);

	req.on('close', function() {
		var index = clients.indexOf(res);
		if (index != -1) {
			clients.splice(index, 1);
		}

	});
}

app.get('*', function(req, res) {

	var parsedURL = url.parse(req.url, true);
	var pathname = parsedURL.pathname;

	var reqURL = __dirname + req.url;
	if(pathname == '/') reqURL = __dirname + '/webroot/index.html';
	
	if (pathname == '/images') {

		stream(req, res, 'text/event-stream');
		if(verbose) console.log('kinect stream requested');		

	} else {

		var mimeType = false;
		for(var i=0; i< urlRules.length; i++) {
			if (reqURL.indexOf(urlRules[i][0]) > -1) {
				mimeType = urlRules[i][1];
				i = urlRules.length;
			}
		}
		if(!mimeType) mimeType = 'text/plain';
		fs.readFile(reqURL, function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' +reqURL);
				console.log('Error loading ' +reqURL);
			}
			res.writeHead(200,{
				'Content-Type': mimeType
			});
			res.end(data);
		});
	}

});


var id = 0;
function writeImage(image) {

	var uri = 'data:image/png;base64,' + image.toString('base64');

	clients.forEach(function(client) {
		client.write('id: ' + id + '\n');
		client.write('data: ' + uri + '\n\n');
	});

	id++;
}

process.stdin.resume();
process.stdin.pipe(new BufferedNetstringStream).on('data', writeImage);
http.listen(portNum);

console.log(colors.green.bold('Node server started!')); 

