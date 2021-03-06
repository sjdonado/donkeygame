var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

var clients = [];
var lastPlayderID = 0;

io.on('connection', (socket)=>{
	console.log("New connection with client "+socket.handshake.address);
	socket.on('newPlayer',function(){
        socket.player = {
            id: lastPlayderID++,
            x: 0,
            y: 0,
        };
        socket.emit('allPlayers', getAllPlayers());
        socket.broadcast.emit('newPlayer', socket.player);
    });
});

server.listen(8080, ()=>{
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