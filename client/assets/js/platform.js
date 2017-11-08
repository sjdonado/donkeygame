var platform = {
	sprites:{
		x: 16,
		y: 8,
		url: 'assets/sprites/platform.png'
	},
	init: () =>{
		platforms = game.add.group();
		// game.physics.arcade.enable(platforms);
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
		while (x<game.width){
			platformO = platforms.create(x, game.height-8, 'platform');
			platformO.body.immovable = true;
			x += 16;
		}
	},
	physics: ()=>{
		game.physics.arcade.collide(mario.object, platforms);
		game.physics.arcade.collide(barriles, platforms);
		game.physics.arcade.collide(donkeyObject, platforms);
		game.physics.arcade.collide(pauline, platforms);
	},
	generateWord: () => {
            //world's paltforms:
            //ground's platform
            platform.addGround();
            //donkey's platform
            platform.addPlatform(game.width/2 - 79,game.height-528,10);
            //pauline's platform
            platform.addPlatform(game.width/2 -40,40,5);
            //rest
            //left
            platform.addPlatform(0,game.height-48,11);
            platform.addPlatform(0,game.height-144,8);
            platform.addPlatform(0,game.height-240,11);
            platform.addPlatform(152,game.height-288,2);
            platform.addPlatform(0,game.height-336,1);
            platform.addPlatform(72,game.height-336,3);
            platform.addPlatform(0,game.height-432,8);
            platform.addPlatform(128,game.height-480,3);
            platform.addPlatform(game.width/2 - 132,game.height-566,2);
            //center
            platform.addPlatform(86,game.height-96,20);
            platform.addPlatform(game.width/2-79,game.height-192,10);
            platform.addPlatform(game.width/2-63,game.height-288,8);
            platform.addPlatform(game.width/2-143,game.height-384,18);
            //right
            platform.addPlatform(game.width-176,game.height-48,11);
            platform.addPlatform(game.width-128,game.height-144,8);
            platform.addPlatform(game.width-176,game.height-240,11);
            platform.addPlatform(game.width-183,game.height-288,2);
            platform.addPlatform(game.width-120,game.height-336,3);
            platform.addPlatform(game.width-16,game.height-336,1);
            platform.addPlatform(game.width-125,game.height-432,8);
            platform.addPlatform(game.width-176,game.height-480,3);
            platform.addPlatform(game.width/2 + 102,game.height-566,2);
	}
}
