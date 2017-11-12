var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

var lastPlayderID = 0;
var clients = [];

io.on('connection', (socket)=>{
	console.log("New connection with client " + socket.handshake.address);
    socket.playerID = lastPlayderID++;
    var data = {
        id: socket.playerID,
        x: 0,
        y: 0
    };
    socket.on('newPlayer', ()=>{
        data.x = 0;
        data.y = 0;
        clients.push(data);
        console.log(clients);
        socket.emit('allPlayers', {
            id: socket.playerID,
            players: clients
        });
        socket.broadcast.emit('newPlayer', data);
    });
    socket.on('movePlayer', (data)=>{
        socket.broadcast.emit('moveAllPlayers', data);
    });
    socket.on('disconnect', ()=>{
        reset(socket, clients);
    });
    socket.on('reset', ()=>{
        reset(socket, clients);
    });
    socket.on('location', (data)=>{
        if(typeof clients[getIndex(data.id)] != "undefined"){
            clients[getIndex(data.id)].x = data.x;
            clients[getIndex(data.id)].y = data.y;
        }
    });
});

var port = process.env.PORT || 8080;

server.listen(port, ()=>{
	console.log('Listening on '+ server.address().address);
});

function reset(socket, clients){
    console.log("Disconnected client: " + socket.handshake.address);
    console.log(socket.playerID);
    clients.splice(getIndex(socket.playerID), 1);
    console.log(clients);
    io.sockets.emit('remove', socket.playerID);
}

function getIndex(id){
    index = -1;
    clients.forEach((item) => {
      if(item.id == id) index = clients.indexOf(item);
    });
    return index;
}

// function getAllPlayers(){
//     var players = [];
//     console.log(Object.keys(io.sockets.connected));
//     Object.keys(io.sockets.connected).forEach(function(socketID){
//         var player = io.sockets.connected[socketID];
//         console.log(player.playerID);
//         if(player) players.push(player.playerID);
//     });
//     return players;
// }