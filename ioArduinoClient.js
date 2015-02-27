//========================================================
//============ SOCKET.IO CLIENT PORTION ==================
//========================================================

var socket = require('socket.io-client')('http://104.131.39.242:5000');
socket.on('connect', function(){
	console.log('Connection Established');
});

socket.on('event', function(data){});

socket.on('disconnect', function(){
	console.log('Disconnected from Server');
});