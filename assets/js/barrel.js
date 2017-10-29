var barrel = {
	sprites:{
		x: 17,
		y: 10,
		url: 'assets/sprites/barrel2.png'
	},
	init: () =>{
		sprite = this.game.add.sprite(280,100, 'barrel');
		sprite.visible = false;
		barriles = this.game.add.group();
		barriles.enableBody = true;
	},
	addBarrel: (value, context) => {
		barrelObject = barriles.create(280, 100, 'barrel');
		barrelObject.body.collideWorldBounds = true;
		barrelObject.body.gravity.y = 300;
		barrelObject.body.bounce.y = 0.5;
		barrelObject.body.bounce.x = 0.5;
		barrelObject.animations.add('animation', [0,1,4,3]);
		barrelObject.animations.play('animation', 2, true);
		if(value == 1){
			barrelObject.body.velocity.x = -100;
		}else{
			barrelObject.body.velocity.x = 100;
		}
		game.physics.arcade.collide(marioObject,barriles);
        game.physics.arcade.overlap(marioObject, barriles, (ma, ba) => {
            ba.kill();
        },null, context);
	}
}
