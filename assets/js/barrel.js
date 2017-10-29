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
	addBarrel: (value, position) => {
		barrelObject = barriles.create(280, 100, 'barrel');
		barrelObject.collideWorldBounds = true;
		barrelObject.body.gravity.y = 300;
		barrelObject.body.bounce.y = 0.3;
		barrelObject.animations.add('animation', [0,1,4,3]);
		barrelObject.animations.play('animation', 2, true);
		if(value == 1){
			barrelObject.body.velocity.x = -100;
		}else{
			barrelObject.body.velocity.x = 100;
		}
	}
}
