function Component(data){

	if(data.name){
		this.name = data.name;
		console.log("Got new object: " + this.name);
	}

	if(data.inputs){
		this.inputs = data.inputs;
		console.log(this.name+" has "+this.inputs+" inputs.");
	}

	if(data.outputs){
		this.outputs = data.outputs;
		console.log(this.name+" has "+this.outputs+" outputs.");
	}

	this.socketId = data.id;

	this.width = (this.name.length * 4) + 20;

	if(this.outputs >= this.inputs){
		this.height = this.outputs * 25;
	} else {
		this.height = this.inputs * 25;
	}	

	this.location = new p5.Vector(50,50);

}

Component.prototype.display = function(){

	stroke(0,0,0);
	strokeWeight(2);
	fill( 255,255,255 );
	rect( this.location.x,50, this.location.y, this.width, this.height );

}

Component.prototype.setColor = function(color){

	fill(color);
	// console.log("setColor triggered!");

}