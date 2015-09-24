	
$(document).ready(function(){
	var size = {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	};

	var container = $('#wbcontainter');
	var whiteboard = document.createElement("canvas");
	whiteboard.setAttribute('width',size.width);
	whiteboard.setAttribute('height',size.height);
	whiteboard.setAttribute('id','canvas');
	container.append(whiteboard);

	var context = whiteboard.getContext("2d");

	var strokes = [];
	var socket = io();
	socket.emit('pageLoad', true);

	socket.on('drawingLoad', function(data){
		strokes = data;
		draw();
	});

	socket.on('stroke', function(data){
		drawStroke(data);
	});

	$('#canvas').mousedown(function(e){
		var lastClick =  new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

		$(this).mousemove(function(e){
			current = new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			newStroke = new Stroke(lastClick, current);
			drawStroke(newStroke);
			socket.emit('stroke', newStroke);
			lastClick = current;
		});

  		$(this).mouseup(function(mosue){
  			$(this).off('mousemove');
  		});

	});

	function Click(x,y){
		this.x = x;
		this.y = y;
	};
	
	function Stroke(from ,to ,color, width){

		this.from = from;
		this.to = to;
		this.color = color || "#df4b26";
		this.size = width || 5;
	};

	function drawStroke (stroke){
		context.strokeStyle = stroke.color;
		context.lineJoin = "round";
		context.lineWidth = stroke.width;

		context.moveTo(stroke.from.x,stroke.from.y);
		context.lineTo(stroke.to.x,stroke.to.y);
		context.stroke();
	};

	function draw(){
		for (var i = 0; i < strokes.length; i++) {
			drawStroke(strokes[i]);
		};
	}
});