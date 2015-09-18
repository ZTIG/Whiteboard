
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var users = 0;
var strokes = [];

app.set('views', path.join(__dirname, 'templates'));

app.get('/room',function(req, res){
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.render('room.html');
});

http.listen(3000,function(){
	console.log("Listening on port 3000.")
})


io.on('connection', function(socket){
	users += 1;
	socket.on
	socket.on('disconnect', function(){
		users -= 1;

	});
	socket.on('stroke',function(stroke){
		strokes.push(stroke);
		io.emit('stroke');
	});
});