var princess = {
	sprites:{
		x: 24,
		y: 22,
		url: 'assets/sprites/pauline.png'
	},
	init: () =>{
		pauline = this.game.add.sprite(this.game.width/2,24, 'pauline');
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
		contPauline = 1;
	},
	move: () => {
		if(contPauline < 30){
			pauline.x += 1;
			pauline.animations.play('right', 2);
		}
		if(contPauline >= 30 && contPauline < 60){
			pauline.x -= 1;
			pauline.animations.play('left', 2);
		}
		if(contPauline == 60){
			contPauline = 0;
		}
		contPauline += 1;
	}
}
