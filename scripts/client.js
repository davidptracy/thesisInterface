//========================================================
//============ SOCKET.IO CLIENT PORTION ==================
//========================================================

// var socket = require('socket.io-client')('http://104.131.39.242:5000');

var socket = io();

socket.on('connect', function(){

	console.log('Connection Established with Server ...');

});

socket.on('objectFromServer', function(data){

	//create a component if it's not in the list already
	if ( !verifyEntity(data) ){
		var component = new Component(data);
		components.push(component);
	}

});

socket.on('objectDisconnectFromServer', function(data){
	var id = data;
	console.log('received device disconnection notice ' + id);

	for (var i = 0; i < components.length; i++) {
		var c = components[i];

		if (c.id == id){
			var indexToRemove = components.indexOf(c);
			components.splice(indexToRemove, 1);
		};		
	}
	
});

socket.on('message', function(data){
	console.log(data);
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});

function verifyEntity(data){

	if (components){
		for (var i = 0; i < components.length; i++) {
	        if (components[i].id === data.id) {
	        	console.log(data.name + " already exists!");
	            return true;
	        }
	    }
	} else {
	    return false;
	}
}