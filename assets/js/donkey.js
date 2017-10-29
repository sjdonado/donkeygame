var donkey = {
	sprites:{
		x: 47,
		y: 32,
		url: 'assets/sprites/dk2.png'
	},
	init: () =>{
		donkeyObject = this.game.add.sprite(this.game.width/2,80, 'dk');
		this.game.physics.arcade.enable(donkeyObject);
        donkeyObject.enableBody = true;
        donkeyObject.body.bounce.y = 0.1;
        donkeyObject.anchor.setTo(0.5);
        donkeyObject.body.gravity.y = 300;
        donkeyObject.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		donkeyObject.frame = 0;
		donkeyObject.animations.add('golpear', [1,4]);
		this.cont = 0;
	},
	move: () => {
		if(this.cont == 0){
			this.num = Math.floor((Math.random()) * 2);
			donkeyObject.animations.play('golpear', 2, true);
		}else{
			if(this.cont == 110){
				donkeyObject.animations.stop();
				donkeyObject.frame = 3;
			}
			if(this.cont == 150){
				barrel.addBarrel(this.num);
				donkeyObject.frame = 2;
			}
			if(this.cont == 180){
				this.cont = -1;
			}
		}
		this.cont += 1;
	}
}
