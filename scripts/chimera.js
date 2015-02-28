var components = new Array();

function setup() {
  createCanvas(640, 480);
}

function draw() {

	background(255);

	for(var i = 0; i < components.length; i++) {
		components[i].display();
	}


	// for(var component in components){
	// 	component.update();
	// }
	
}