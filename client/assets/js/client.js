var client = {
	socket: io.connect('https://gamephaser.herokuapp.com:8080', {'forceNew': true}),
	playerMap: {},
	askNewPlayer: ()=>{
		client.socket.emit('newPlayer');
	},
	newPlayer: ()=>{
		client.socket.on('newPlayer', (data)=>{
			console.log(data);
		 	// client.addNewPlayer(data.id, data.x, data.y);
		});
	},
	allPlayers: ()=>{
		client.socket.on('allPlayers',function(data){
		    console.log(data);
		    // for(var i = 0; i < data.length; i++){
		    //     client.addNewPlayer(data.id, data.x, data.y);
		    // }
		});
	},
	addNewPlayer: (id, x, y)=>{
		client.playerMap[id] = game.add.sprite(x, y, 'mario');
	}
}