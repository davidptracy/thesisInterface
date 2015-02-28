//========================================================
//============ SOCKET.IO CLIENT PORTION ==================
//========================================================

var socket = require('socket.io-client')('http://104.131.39.242:5000');

var objectData = {
	"name" : "Object1",
	"inputs" : 2,
	"outputs" : 1
}


// establish connection with server, send object properties
socket.on('connect', function(){

	console.log('Connection Established with Server, sending object data...');	
	socket.emit('objectProperties', objectData );

});

//get available properties of the arduino


socket.on('event', function(data){});

socket.on('message', function(data){
	console.log(data);
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});