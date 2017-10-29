var donkey = {
	sprites:{
		x: 47,
		y: 32,
		url: 'assets/sprites/dk2.png'

	},
	init: () =>{
		donkeyObject = this.game.add.sprite(280,100, 'dk');
		this.game.physics.arcade.enable(donkeyObject);
        donkeyObject.body.bounce.x = 0.3;
        donkeyObject.anchor.setTo(0.5);
        donkeyObject.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		donkeyObject.frame = 0;
		donkeyObject.animations.add('golpear', [1,4]);
		this.cont = 0;
	},
	move: (context) => {
		if(this.cont == 0){
			this.num = Math.floor((Math.random()) * 2);
			donkeyObject.animations.play('golpear', 2, true);
		}else{
			if(this.cont == 200){
				donkeyObject.animations.stop();
				donkeyObject.frame = 3;
			}
			if(this.cont == 240){
				barrel.addBarrel(this.num, context);
				donkeyObject.frame = 2;
			}
			if(this.cont == 270){
				this.cont = -1;
			}
		}
		this.cont += 1;
	}
}
