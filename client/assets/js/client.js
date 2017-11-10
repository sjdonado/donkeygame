var client = {
	//https://donkeygame.herokuapp.com',
	socket: io.connect('https://donkeygame.herokuapp.com', {'forceNew': true}),
	arrayPlayers: [],
	id: null,
	askNewPlayer: ()=>{
		client.socket.emit('newPlayer');
	},
	newPlayer: (callback)=>{
		client.socket.on('newPlayer', (data)=>{
			console.log('id newPlayer: ' + data);
			client.addNewPlayer(data);
			callback(client.arrayPlayers[data]);
		});
	},
	allPlayers: ()=>{
		client.socket.on('allPlayers', (data)=>{
		    console.log('id host: ' + data.id);
		    console.log(data.players);
		    client.id = data.id;
		    client.addNewPlayer(client.id);
		    data.players.forEach((element) => {
		        client.addNewPlayer(element);
		    })
		});
	},
	addNewPlayer: (id)=>{
		client.arrayPlayers[id] = new mario(id);
	},
	movePlayer: (move)=>{
		client.socket.emit('movePlayer', {
			id: client.id,
			move: move
		});
	},
	moveAllPlayers: (callback)=>{
		client.socket.on('moveAllPlayers', (data)=>{
			callback(data);
		});
	},
	removePlayer: ()=>{
		client.socket.on('remove', (id)=>{
			// client.arrayPlayers[id].destroy();
			delete client.arrayPlayers[id];
			console.log('Disconnect id: ' + id);
		});
	}
}