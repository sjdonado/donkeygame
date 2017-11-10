var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

var lastPlayderID = 0;
// var clients [];

io.on('connection', (socket)=>{
	console.log("New connection with client " + socket.handshake.address);
    socket.playerID = lastPlayderID++;
    socket.on('newPlayer', ()=>{
        socket.emit('allPlayers', {
            id: socket.playerID,
            players: getAllPlayers()
        });
        socket.broadcast.emit('newPlayer', socket.playerID);
    });
    socket.on('movePlayer', (data)=>{
        socket.broadcast.emit('moveAllPlayers', data);
    })
    socket.on('disconnect', ()=>{
        console.log(socket.playerID);
		console.log("Disconnected client: " + socket.handshake.address);
		io.sockets.emit('remove', socket.playerID);
	})
});

var port = process.env.PORT || 8080;

server.listen(port, ()=>{
	console.log('Listening on '+ server.address().address);
});

function getAllPlayers(){
    var players = [];
    console.log(Object.keys(io.sockets.connected));
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID];
        if(player) players.push(player.playerID);
    });
    return players;
}