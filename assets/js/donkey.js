var dk = {
	sprites:{
		x: 51,
		y: 36,
		url: 'assets/sprites/dk.png'

	},
	init: () =>{
		this.entity = this.game.add.sprite(100,100, 'dk');
		this.game.physics.arcade.enable(this.entity);
        this.entity.body.bounce.y = 0.3;
        this.entity.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		this.entity.frame = 0;
		this.entity.animations.add('left', [0,1,2,3], 2, true);
		this.entity.animations.add('right', [5,2,2,3], 2, true);
		this.entity.body.animations.play('right');
		this.entity.body.animations.play('left');
	},
	move: () => {
		// num = Math.floor((Math.random() * 10) + 1);
		// console.log(num);
		// if(num > 5){
		// 	this.entity.body.velocity.x -= 1;
		// 	this.entity.animations.play('left');
		// 	await sleep(2000);
		// }else if(num < 5){
		// 	this.entity.body.velocity.x += 1;
		// 	this.entity.animations.play('right');
		// 	await sleep(2000);
		// }else{
	        // this.entity.body.velocity.x = 0;
        	// this.entity.frame = 2;
		// }
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}