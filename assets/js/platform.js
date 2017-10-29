var platform = {
	sprites:{
		x: 16,
		y: 8,
		url: 'assets/sprites/platform.png'
	},
	init: () =>{
		platforms = this.game.add.group();
		platforms.enableBody = true;
	},
	addPlatform: (x,y,factor) => {
		i = 0;
		xi = x;
		while(i<factor){
			platformO = platforms.create(xi, y, 'platform');
			platformO.body.immovable = true;
			xi += 16;
			i += 1;
		}
	},
	addGround:()=>{
		x = 0;
		while (x<this.game.width){
			platformO = platforms.create(x, this.game.height-8, 'platform');
			platformO.body.immovable = true;
			x += 16;
		}

	},
	physics: ()=>{
		this.game.physics.arcade.collide(mario,platforms);
		this.game.physics.arcade.collide(barriles,platforms);
	}
}
