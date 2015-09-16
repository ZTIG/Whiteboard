
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var users = 0;
var marks = [];
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));

app.get('/whiteboard',function(req, res){
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.render('wb.jade');
});

http.listen(3000,function(){
	console.log("Listening on port 3000.")
})


io.on('connection', function(socket){
	users += 1;
	socket.on('disconnect', function(){
		users -= 1;
	});
	socket.on('draw',function(mark){
		
	});
});