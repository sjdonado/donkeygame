var barrel = {
	sprites:{
		x: 17,
		y: 10,
		url: 'assets/sprites/barrel.png'
	},
	init: () =>{
		// sprite = game.add.sprite(0, 0, 'barrel');
		// sprite.visible = false;
		barriles = game.add.group();
		barriles.enableBody = true;
		contStart = 0;
	},
	startGame: () => {
		if((contStart/2) % 10 === 0){
			num = Math.floor(Math.random()*2);
			if(num === 0){
				barrel.addBarrel(1);
			}else{
				barrel.addBarrel(-1);
			}
		}
		if(contStart < lvl.barrels){
			contStart++;
			swCont = 0;
		}else{
			if(swCont > 1000){
				contStart = 0;
			}else{
				swCont++;
			}
		}
	},
	addBarrel: (value) => {
		barrelObject = barriles.create(game.width/2, game.height*0.11, 'barrel');
		barrelObject.body.collideWorldBounds = true;
		barrelObject.body.gravity.y = 300;
		barrelObject.body.bounce.y = 0.5;
		barrelObject.body.bounce.x = 0.9;
		barrelObject.animations.add('animation', [0,3,4,1]);
		barrelObject.animations.play('animation', 5, true);
		num = Math.floor(Math.random()*60 + 10);
		if(value == 1){
			barrelObject.body.velocity.x = -100 - num;
		}else{
			barrelObject.body.velocity.x = 100 + num;
		}
	},
	physics: () =>{
		game.physics.arcade.collide(barriles, barriles);
	},
	killBarrel: () => {
		barriles.forEach(function(member, param) {
			if(game.height - 50 <= member.y){
				member.body.collideWorldBounds = false;
				member.body.outOfBoundsKill = true;
			}
		});
	}
}
