//===========================================================
//=================== HTTP PORTION ==========================
//===========================================================

var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(5000, '0.0.0.0');

console.log("Listening on 5000");

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
	
	// Read index.html
	
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
}

//========================================================
//=============== SOCKET.IO PORTION ======================
//========================================================

var io = require('socket.io').listen(httpServer);

var connectedSockets = [];

var objects = [];

io.sockets.on('connection', function (socket){

	console.log("We have a new client: " + socket.id);

	//add it to the array of connected sockets
	connectedSockets.push(socket);

	socket.on('objectProperties', function(data){

		var object = new Entity(data, socket.id);
		objects.push(object);
		console.log("New Object: " + object.name);

		io.to(socket.id).emit('message', 'Server received object information');

	});

	socket.on('disconnect', function(){

		var socketId = socket.id;
		console.log("Client has disconnected!" + socket.id);
		removeEntity(socketId);

		var indexToRemove = connectedSockets.indexOf(socket);
		connectedSockets.splice(indexToRemove, 1);

	});

});

//========================================================
//================== GLOBAL METHODS ======================
//========================================================

//comment

function removeEntity(socketId){

	var id = socketId;

	for (var i = 0; i < objects.length; i++) {
		var o = objects[i];

		console.log("id passed from method: " + id);
		console.log("object id : " + o.socketId);

		if (o.socketId == id){

			var indexToRemove = objects.indexOf(o);
			objects.splice(indexToRemove, 1);
			break;

		} else {
			console.log('could not remove object');
		}
	}

	io.sockets.emit('objectDisconnectFromServer', id);
	console.log('Telling all clients to remove socket with id: '+ id);

}

function updateClient(){
	
	if (objects){

		for(var i = 0; i < objects.length; i++){
			io.sockets.emit('objectFromServer', objects[i]);
			console.log('sending object: '+ objects[i].name );	
		}

	} 
}

// if (objects.length > 0){
setInterval(updateClient, 1000);
// }



//========================================================
//================== ENTITY CLASS ========================
//========================================================

function Entity(data, id){	
	
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
	console.log(this.name+" has an associated socket ID of : "+this.socketId);

}

Entity.prototype.getName = function() {
	return this.name;
}

Entity.prototype.getObjectId = function() {
	return this.id;
}
