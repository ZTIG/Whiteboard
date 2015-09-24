var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/room.html');
});

http.listen(3000,function(){
	console.log("Listening on port 3000.");
});

users = 0;
strokes = [];

io.on('connection',function(client){
	users++;
	console.log("Connection was made. " + users + " users online" );
	
	client.on('pageLoad',function(){
		client.emit('drawingLoad', strokes);
	});

	client.on('disconnect',function(){
		users--;
		console.log('User disconnected' + users);
		
		if(users === 0){
			console.log('Wiping the board');
			strokes= [];
		}
	});

	client.on('stroke', function(stroke){
		strokes.push(stroke);
		client.broadcast.emit('stroke', stroke);
	});
});

