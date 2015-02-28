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

	this.socketId = id;

	var width = (this.name.length * 4) + 20;

	if(this.outputs >= this.inputs){
		var height = this.outputs * 25;
	} else {
		var height = this.inputs * 25;
	}	

}

Component.prototype.display = function(){
	stroke(0,0,0);
	strokeWeight(2);
	fill( 255,255,255 );
	rect( 50,50, this.width, this.height );
}