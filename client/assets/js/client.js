var client = {
	// socket: io.connect('https://donkeygame.sjdonado.com', {'forceNew': true}), // Commented for CDN deployment
	arrayPlayers: [],
	id: 0, // Set default to 0 for single player
	dataId: 1, // Set default to 1 for single player
	askNewPlayer: ()=>{
		// client.socket.emit('newPlayer'); // Commented for CDN deployment
		console.log('Socket functionality disabled for CDN deployment');
		// Create a single local player for CDN deployment
		const mockData = { id: 1, x: 0, y: 0 };
		client.dataId = mockData.id;
		client.addNewPlayer(mockData);
		client.id = 0;
	},
	newPlayer: (callback)=>{
		/* Commented for CDN deployment
		client.socket.on('newPlayer', (data)=>{
			if(client.id != null && typeof client.arrayPlayers[getIndex(data.id)] === "undefined"){
				console.log('id newPlayer: ' + data.id);
				client.addNewPlayer(data);
				client.id = getIndex(client.dataId);
				callback(client.arrayPlayers[getIndex(data.id)]);
			}
		});
		*/
		console.log('Socket functionality disabled for CDN deployment');
		// Player is already created in askNewPlayer
		if (callback && client.arrayPlayers.length > 0) callback(client.arrayPlayers[0]);
	},
	allPlayers: ()=>{
		/* Commented for CDN deployment
		client.socket.on('allPlayers', (data)=>{
			client.arrayPlayers = [];
		    console.log('id host: ' + data.id);
		    console.log('server response: ' + data.players.join());
		    client.dataId = data.id;
		    data.players.forEach((element) => {
		        client.addNewPlayer(element);
		    });
		    client.id = getIndex(client.dataId);
		});
		*/
		console.log('Socket functionality disabled for CDN deployment');
		// Player will be created in askNewPlayer, no need to do anything here
	},
	addNewPlayer: (data)=>{
		client.arrayPlayers.push(new mario(data.id, data.x, data.y));
		console.log(client.arrayPlayers);
	},
	movePlayer: (move)=>{
		/* Commented for CDN deployment
		client.socket.emit('movePlayer', {
			id: client.dataId,
			move: move
		});
		*/
		console.log('Move: ' + move);
		// No need to do anything here since movement is handled directly in the game loop
	},
	moveAllPlayers: (callback)=>{
		/* Commented for CDN deployment
		client.socket.on('moveAllPlayers', (data)=>{
			if(client.id != null){
				callback(data);
			}else{
				callback(null);
			}
		});
		*/
		// Nothing to do here in single player mode
		if (callback) callback(null);
	},
	removePlayer: (gameStage)=>{
		/* Commented for CDN deployment
		client.socket.on('remove', (id)=>{
			console.log('Disconnect id: ' + id);
			if(typeof client.arrayPlayers[getIndex(id)] != "undefined"){
				client.arrayPlayers[getIndex(id)].entity.body = null;
				client.arrayPlayers[getIndex(id)].entity.destroy();
				client.arrayPlayers.splice(getIndex(id), 1);
				if(client.id != null) client.id = getIndex(client.dataId);
			}
			console.log(client.arrayPlayers);
		});
		*/
		console.log('Socket functionality disabled for CDN deployment');
	},
	location: ()=>{
		/* Commented for CDN deployment
		if(client.id != null){
			client.socket.emit('location', {
				id: client.dataId,
				x: client.arrayPlayers[client.id].entity.body.x,
				y: client.arrayPlayers[client.id].entity.body.y
			});
		}
		*/
		console.log('Socket functionality disabled for CDN deployment');
	},
	reset: ()=>{
        client.arrayPlayers = [];
        client.id = 0;
		client.dataId = 1;
		// client.socket.emit('reset'); // Commented for CDN deployment
		console.log('Game reset for CDN deployment');
	}
}

function getIndex(id){
	index = -1;
	client.arrayPlayers.forEach((item) => {
	  if(item.id == id) index = client.arrayPlayers.indexOf(item);
	});
	return index;
}
