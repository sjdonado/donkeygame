var client = {
	socket: io.connect('http://port-8080.centos-sjdonado454850.codeanyapp.com', {'forceNew': true}),
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