var client = {
	socket: io.connect('https://gamephaser.herokuapp.com', {'forceNew': true}),
	playerMap: [],
	id: null,
	askNewPlayer: ()=>{
		client.socket.emit('newPlayer');
	},
	newPlayer: ()=>{
		client.socket.on('newPlayer', (data)=>{
			console.log(data);
		 	client.addNewPlayer(data);
		});
	},
	allPlayers: ()=>{
		client.socket.on('allPlayers', (data)=>{
		    console.log(data.players);
		    client.id = data.id;
		    client.addNewPlayer(client.id);
		    data.players.forEach((element) => {
		        client.addNewPlayer(element.id);
		    })
		});
	},
	addNewPlayer: (id)=>{
		client.playerMap[id] = new mario();
	},
	movePlayer: (move)=>{
		client.socket.emit('movePlayer', {
			id: client.id,
			move: move
		});
	},
	moveAllPlayers: (callback)=>{
		client.socket.on('movePlayer', (data)=>{
			callback(data);
		});
	},
	removePlayer: ()=>{
		client.socket.on('remove', (id)=>{
			// client.playerMap[id].destroy();
			delete client.playerMap[id];
			console.log(client.playerMap);
		});
	}
}