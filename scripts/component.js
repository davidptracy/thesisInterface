function Component(data){

	if(data.name){
		this.name = data.name;
	}

	if(data.inputs){
		this.inputs = data.inputs;
	}

	if(data.outputs){
		this.outputs = data.outputs;
	}

	this.socketId = id;

	var width = (this.name.length * 4) + 20;

	if(this.outputs >= this.inputs){
		var height = this.outputs * 25;
	} else {
		var height = this.inputs * 25;
	}	

	stroke(0,0,0);
	fill( 255,255,255 );
	rect( 50,50, width, height );

}