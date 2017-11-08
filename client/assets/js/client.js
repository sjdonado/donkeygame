var client = {
	socket: io.connect('http://port-8080.centos-sjdonado454850.codeanyapp.com', {'forceNew': true}),
	playerMap: [],
	id: null,
	askNewPlayer: ()=>{
		client.socket.emit('newPlayer');
	},
	newPlayer: ()=>{
		client.socket.on('newPlayer', (data)=>{
			console.log(data);
			client.id = data.id;
		 	// client.addNewPlayer(data.id, data.x, data.y);
		});
	},
	allPlayers: ()=>{
		client.socket.on('allPlayers', (array)=>{
		    console.log(array);
		    // for(var i = 0; i < data.length; i++){
		    //     client.addNewPlayer(data.id, data.x, data.y);
		    // }
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
	moveAllPlayers: ()=>{
		client.socket.on('moveAllPlayers', (data)=>{
			console.log(data);
		});
	},
	removePlayer: ()=>{
		client.socket.on('remove', (id)=>{
			//client.playerMap[id].destroy();
			delete client.playerMap[id];
			console.log(client.playerMap);
		});
	}
}