var barrel = {
	sprites:{
		x: 17,
		y: 10,
		url: 'assets/sprites/barrel2.png'
	},
	init: () =>{
		sprite = this.game.add.sprite(this.game.width/2, 80, 'barrel');
		sprite.visible = false;
		barriles = this.game.add.group();
		barriles.enableBody = true;
		contStart = 0;
	},
	startGame: () => {
		if((contStart/2) % 10 == 0){
			num = Math.floor(Math.random()*2);
			if(num == 0){
				barrel.addBarrel(1);
			}else{
				barrel.addBarrel(-1);
			}
		}
		if(contStart < 101){
			contStart++;
		}
	},
	addBarrel: (value) => {
		barrelObject = barriles.create(this.game.width/2, 90, 'barrel');
		barrelObject.body.collideWorldBounds = true;
		barrelObject.body.gravity.y = 300;
		barrelObject.body.bounce.y = 0.5;
		barrelObject.body.bounce.x = 0.9;
		barrelObject.animations.add('animation', [0,1,4,3]);
		barrelObject.animations.play('animation', 2, true);
		num = Math.floor(Math.random()*80 + 10);
		if(value == 1){
			barrelObject.body.velocity.x = -100 - num;
		}else{
			barrelObject.body.velocity.x = 100 + num;
		}
	},
	physics: ()=>{
		this.game.physics.arcade.collide(barriles, barriles);
	}
}
