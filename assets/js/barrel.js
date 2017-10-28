var barrel = {
	sprites:{
		x: 25,
		y: 14,
		url: 'assets/sprites/barrel.png'
	},
	init: () =>{
		this.game.add.sprite(110,110, 'barrel');
		barriles = this.game.add.group();
		barriles.enableBody = true;
	},
	addBarrel: function (value){
		barrel = barriles.create(110, 110, 'barrel');
		barrel.collideWorldBounds = true;
		barrel.body.gravity.y = 300;
		barrel.body.bounce.y = 0.3;
		barrel.animations.add('animation', [0,1,4,3]);
		barrel.animations.play('animation', 2, true);
		if(value == 1){
			barrel.body.velocity.x = -15;
		}else{
			barrel.body.velocity.x = 15;
		}
	}
}