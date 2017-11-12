var client = {
	//https://donkeygame.herokuapp.com',
	socket: io.connect('https://donkeygame.herokuapp.com', {'forceNew': true}),
	arrayPlayers: [],
	id: null,
	dataId: null,
	askNewPlayer: ()=>{
		client.socket.emit('newPlayer');
	},
	newPlayer: (callback)=>{
		client.socket.on('newPlayer', (data)=>{
			if(typeof client.arrayPlayers[getIndex(data.id)] === "undefined" && client.id != null){
				console.log('id newPlayer: ' + data.id);
				client.addNewPlayer(data);
				client.id = getIndex(client.dataId);
				callback(client.arrayPlayers[getIndex(data.id)]);
			}
		});
	},
	allPlayers: ()=>{
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
	},
	addNewPlayer: (data)=>{
		client.arrayPlayers.push(new mario(data.id, data.x, data.y));
		console.log(client.arrayPlayers);
	},
	movePlayer: (move)=>{
		client.socket.emit('movePlayer', {
			id: client.dataId,
			move: move
		});
	},
	moveAllPlayers: (callback)=>{
		client.socket.on('moveAllPlayers', (data)=>{
			if(client.id != null && client.arrayPlayers[client.id].move){
				callback(data);
			}else{
				callback(null);
			}
		});
	},
	removePlayer: (gameStage)=>{
		client.socket.on('remove', (id)=>{ 
			console.log('Disconnect id: ' + id);
			if(typeof client.arrayPlayers[getIndex(id)] != "undefined"){
				client.arrayPlayers[getIndex(id)].entity.body = null;
				client.arrayPlayers[getIndex(id)].entity.destroy();	
				client.arrayPlayers.splice(getIndex(id), 1)
				client.id = getIndex(client.dataId);
			}
			console.log(client.arrayPlayers);
		});
	},
	location: ()=>{
		if(client.id != null){
			client.socket.emit('location', {
				id: client.dataId,
				x: client.arrayPlayers[client.id].entity.body.x,
				y: client.arrayPlayers[client.id].entity.body.y 
			});
		}
	},
	reset: ()=>{
        client.id = null;
		client.dataId = null;
		client.socket.emit('reset');
	}
}

function getIndex(id){
	index = -1;
	client.arrayPlayers.forEach((item) => {
	  if(item.id == id) index = client.arrayPlayers.indexOf(item);
	});
	return index;
}