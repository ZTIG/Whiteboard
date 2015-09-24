
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname));

app.get('/room',function(req, res){
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.sendFile(__dirname + '/public/views/room.html');
});

http.listen(3000,function(){
	console.log("Listening on port 3000.")
});


var users = 0;
var strokes = [];

io.on('connection', function(socket){
	users++;
	socket.on('disconnect',function(){
		users--;
		if(users === 0){
			strokes = [];
		}
	});
	socket.on('stroke',function(stroke){
		strokes.push(stroke);
		io.emit('stroke');
	});
});