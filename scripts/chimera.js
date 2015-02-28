var components = new Array();

function setup() {
  createCanvas(640, 480);
}

function draw() {

	background(255);

	for(var i = 0; i < components.length; i++) {
		var c = components[i];

		if ( mouseIsPressed() ){
			if ( mouseX > c.location.x && mouseX < (640 - c.width + c.location.x) );
			c.setColor('red'); 
		} else {
			c.setColor('white');
		}

		c.display();

	}
	
}