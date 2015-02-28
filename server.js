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

	socket.on('disconnect', function(){
		console.log("Client has disconnected!");
	});

	socket.on('objectProperties', function(data){

		var object = new Entity(data);
		objects.push(object);

		io.to(socket.id).emit('message', 'Server received object information');

	});

});

io.sockets.on('')

//========================================================
//================= ENTITY CLASS =======================
//========================================================

function Entity(data){	
	if(data.name){
		this.name = data.name;
		console.log("Got new object: " + this.name);
	}

	if(data.inputs){
		this.inputs = data.inputs;
		console.log(this.name+" has "+this.inputs+" inputs.");
	}

	if(data.inputs){
		this.outputs = data.outputs;
		console.log(this.name+" has "+this.outputs+" outputs.");
	}	
}

Entity.prototype.getName = function() {
	return this.name;
}
