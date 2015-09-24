	
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

	$('#canvas').mousedown(function(e){
  		var lastClick =  new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

  		$(this).mousemove(function(e){
  			current = new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  			newStroke = new Stroke(lastClick, current);
  			strokes.push(newStroke);
  			newStroke.drawSelf(context);
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

	Stroke.prototype.drawSelf = function(ctx){
		ctx.strokeStyle = this.color;
		ctx.lineJoin = "round";
		ctx.lineWidth = this.width;

		ctx.moveTo(this.from.x,this.from.y);
		ctx.lineTo(this.to.x,this.to.y);
		ctx.stroke();
	};

	function draw(){
		for (var i = 0; i < strokes.length; i++) {
			strokes[i].drawSelf(context);
		};
	}
});