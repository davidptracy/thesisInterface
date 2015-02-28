//========================================================
//============ SOCKET.IO CLIENT PORTION ==================
//========================================================

// var socket = require('socket.io-client')('http://104.131.39.242:5000');

var socket = io();

socket.on('connect', function(){

	console.log('Connection Established with Server ...');

});

socket.on('objectFromServer', function(data){
	//create a component
	var component = new Component(data);
	components.push(component);
});

socket.on('message', function(data){
	console.log(data);
});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});