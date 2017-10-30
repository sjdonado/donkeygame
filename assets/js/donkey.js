var donkey = {
	sprites:{
		x: 47,
		y: 32,
		url: 'assets/sprites/dk2.png'
	},
	init: () =>{
		donkeyObject = game.add.sprite(game.width/2, game.height*0.12, 'dk');
		game.physics.arcade.enable(donkeyObject);
        donkeyObject.enableBody = true;
        donkeyObject.body.bounce.y = 0.1;
        donkeyObject.anchor.setTo(0.5);
        donkeyObject.body.gravity.y = 300;
        donkeyObject.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		donkeyObject.frame = 0;
		donkeyObject.animations.add('golpear', [1,4]);
		donkeyObject.animations.add('barril', [2,3]);
		sw = true;
	},
	move: () => {
		if(sw){
			setTimer(() => {
		        num = Math.floor((Math.random()) * 2);
				donkeyObject.animations.play('golpear', 2, true);
				sw = false;
		    }, () => {
				setTimer(() => {
					donkeyObject.animations.stop();
					donkeyObject.animations.play('barril', 2, false);
		        }, () => {
			        setTimer(() => {
						if(num == 1){
							donkeyObject.frame = 0;
						}else{
							donkeyObject.frame = 5;
						}
						barrel.addBarrel(num);
			        }, () => {
			        	sw = true;
			        }, 400);
		        }, 1000);
		    }, 2000);
		}
	},
	fall: () => {
		donkeyObject.body.moves = false;
	}
}
