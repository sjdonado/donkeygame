var platform = {
	sprites:{
		x: 16,
		y: 8,
		url: 'assets/sprites/platform.png'
	},
	init: () =>{
		platforms = this.game.add.group();
		// this.game.physics.arcade.enable(platforms);
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
		this.game.physics.arcade.collide(marioObject, platforms);
		this.game.physics.arcade.collide(barriles, platforms);
		this.game.physics.arcade.collide(donkeyObject, platforms);
		this.game.physics.arcade.collide(pauline, platforms);
	},
	generateWord: () => {
            //world's paltforms:
            //ground's platform
            platform.addGround();
            //donkey's platform
            platform.addPlatform(this.game.width/2 - 79,this.game.height-528,10);
            //pauline's platform
            platform.addPlatform(this.game.width/2 -40,40,5);
            //rest
            //left
            platform.addPlatform(0,this.game.height-48,11);
            platform.addPlatform(0,this.game.height-144,8);
            platform.addPlatform(0,this.game.height-240,11);
            platform.addPlatform(152,this.game.height-288,2);
            platform.addPlatform(0,this.game.height-336,1);
            platform.addPlatform(72,this.game.height-336,3);
            platform.addPlatform(0,this.game.height-432,8);
            platform.addPlatform(128,this.game.height-480,3);
            platform.addPlatform(this.game.width/2 - 132,this.game.height-566,2);
            //center
            platform.addPlatform(86,this.game.height-96,25);
            platform.addPlatform(this.game.width/2-79,this.game.height-192,10);
            platform.addPlatform(this.game.width/2-63,this.game.height-288,8);
            platform.addPlatform(this.game.width/2-143,this.game.height-384,18);
            //right
            platform.addPlatform(this.game.width-176,this.game.height-48,11);
            platform.addPlatform(this.game.width-128,this.game.height-144,8);
            platform.addPlatform(this.game.width-176,this.game.height-240,11);
            platform.addPlatform(this.game.width-183,this.game.height-288,2);
            platform.addPlatform(this.game.width-120,this.game.height-336,3);
            platform.addPlatform(this.game.width-16,this.game.height-336,1);
            platform.addPlatform(this.game.width-125,this.game.height-432,8);
            platform.addPlatform(this.game.width-176,this.game.height-480,3);
            platform.addPlatform(this.game.width/2 + 102,this.game.height-566,2);
	}
}
