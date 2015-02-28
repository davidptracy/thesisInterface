var components = new Array();

function setup() {
  createCanvas(640, 480);
}

function draw() {

	background(255);

	for(var i = 0; i < components.length; i++) {
		var c = components[i];

		if ( mouseIsPressed ){
			if ( (mouseX > c.location.x) && ( mouseX < (640 - c.width + c.location.x) ) ){
				c.setColor([255,0,0]);
				console.log("clicking over rect!"); 
			} else {
				c.setColor([255,255,255]);
			}			
		}

		c.display();
	
	}
}