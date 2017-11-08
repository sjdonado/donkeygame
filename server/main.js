var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

var clients = [];
var lastPlayderID = 0;

io.on('connection', (socket)=>{
	console.log("New connection with client " + socket.handshake.address);
	socket.on('newPlayer', ()=>{
        socket.player = {
            id: lastPlayderID++
        };
        socket.emit('allPlayers', getAllPlayers());
        socket.broadcast.emit('newPlayer', socket.player);
    });
	socket.on('movePlayer', (data)=>{
		socket.broadcast.emit('moveAllPlayers', data);
	})
	socket.on('disconnect', ()=>{
		console.log("Disconnect client: " + socket.handshake.address);
		//io.emit('remove', socket.player.id);
	})
});

var port = process.env.PORT || 8080;

server.listen(port, ()=>{
	console.log('Listening on '+ server.address().address);
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}