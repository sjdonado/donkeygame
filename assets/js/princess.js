var princess = {
	sprites:{
		x: 24,
		y: 22,
		url: 'assets/sprites/pauline.png'
	},
	init: () =>{
		pauline = this.game.add.sprite(this.game.width/2 - 25,24, 'pauline');
		this.game.physics.arcade.enable(pauline);
        pauline.enableBody = true;        
		pauline.body.bounce.y = 0.1;
        pauline.anchor.setTo(0.5);
        pauline.body.gravity.y = 300;
        pauline.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		pauline.animations.add('right', [2,3]);
		pauline.animations.add('left', [0,1]);
		contPauline = 0;
	},
	move: () => {
		if(contPauline < 50){
			pauline.x += 1;
			pauline.animations.play('right', 5);
		}
		if(contPauline >= 50 && contPauline < 100){
			pauline.x -= 1;
			pauline.animations.play('left', 5);
		}
		if(contPauline == 100){
			console.log(pauline.x)
			contPauline = -1;
		}
		contPauline += 1;
	}
}
