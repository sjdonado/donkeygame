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
			console.log('id newPlayer: ' + data.id);
			client.addNewPlayer(data);
			client.id = getIndex(client.dataId);
			callback(client.arrayPlayers[getIndex(data.id)]);
		});
	},
	allPlayers: ()=>{
		client.socket.on('allPlayers', (data)=>{
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
			console.log('Disconnect id: ' + id);
			if(typeof client.arrayPlayers[getIndex(id)] != "undefined"){
				client.arrayPlayers[getIndex(id)].entity.body = null;
				client.arrayPlayers[getIndex(id)].entity.destroy();	
				client.arrayPlayers.splice(getIndex(id), 1)
			}
			if(client.arrayPlayers.length != 0) client.id = getIndex(client.dataId);
			console.log(client.arrayPlayers);
		});
	},
	location: ()=>{
		if(client.arrayPlayers[getIndex(client.id)].move){
			client.socket.emit('location', {
				id: client.id,
				x: client.arrayPlayers[getIndex(client.id)].entity.body.x,
				y: client.arrayPlayers[getIndex(client.id)].entity.body.y 
			});
		}else{
			client.socket.emit('location', {
				id: client.id,
				x: 0,
				y: 0 
			});
		}
	}
}

function getIndex(id){
	index = -1;
	client.arrayPlayers.forEach((item) => {
	  if(item.id == id) index = client.arrayPlayers.indexOf(item);
	});
	return index;
}