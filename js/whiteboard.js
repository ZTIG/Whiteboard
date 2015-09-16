$(document).ready(function(){


	var size ={
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	};

	var container = document.getElementById('wbcontainer');
	var wb = document.createElement('canvas');
	wb.setAttribute('width',size.width);
	wb.setAttribute('height',size.height);
	wb.setAttribute('id','canvas');
	container.appendChild(canvas);

	var context = wb.getContext("2d");
	var socket = io();

	var strokes = [];
	var lastClick = {};
	$('#canvas').mousedown(function(e){
  		lastCLick = currentPosition();

  		this.mousemove(function(){
  			current = currentPosition();
  			strokes.push(new Stroke(lastClick,current));
  			draw();
  			lastClick = current;
  		});

  		$(this).mouseup(function(){
  			$(this).off('mousemove');
  		});

	});

	function Click(x,y){
		this.x = x;
		this.y = y;
	};
	function currentPosition(){
		return new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	};
	function Stroke(from ,to ,color ='black', size = 25){
		this.from = from;

		this.to = to;

		this.color = color;
		this.size = size;
	}

	Stroke.prototype.drawSelf = function(ctx){
		ctx.moveTo(this.from.x,this.from.y);
		ctx.lineTo(this.to.x,this.to.y);
		ctx.stroke();
	};

	function draw(){
		for (var i = 0; i < strokes.length; i++) {
			strokes[i].drawSelf(context);
		};
})();