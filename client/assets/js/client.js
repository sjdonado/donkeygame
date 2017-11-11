var client = {
	//https://donkeygame.herokuapp.com',
	socket: io.connect('localhost:8080', {'forceNew': true}),
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
	removePlayer: (gameStage)=>{
		client.socket.on('remove', (id)=>{
			if(typeof(client.arrayPlayers[id]) != "undefined"){
				client.arrayPlayers[id].entity.body = null;
				client.arrayPlayers[id].entity.destroy();	
			} 
			client.arrayPlayers.splice(client.arrayPlayers.indexOf(id), 1);
			console.log('Disconnect id: ' + id);
			console.log(client.arrayPlayers);
		});
	}
}