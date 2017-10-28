var barrel = {
	sprites:{
		x: 17,
		y: 13,
		url: 'assets/sprites/barrel.png'
	},
	init: () =>{
		sprite = this.game.add.sprite(110,110, 'barrel');
		sprite.visible = false;
		barriles = this.game.add.group();
		barriles.enableBody = true;
	},
	addBarrel: (value, position) => {
		barrelObject = barriles.create(110, 110, 'barrel');
		barrelObject.collideWorldBounds = true;
		barrelObject.body.gravity.y = 300;
		barrelObject.body.bounce.y = 0.3;
		barrelObject.animations.add('animation', [0,1,4,3]);
		barrelObject.animations.play('animation', 2, true);
		barrelObject.body.x = position;
		if(value == 1){
			barrelObject.body.velocity.x = -100;
		}else{
			barrelObject.body.velocity.x = 100;
		}
	}
}