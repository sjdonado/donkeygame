var donkey = {
	sprites:{
		x: 51,
		y: 36,
		url: 'assets/sprites/dk.png'

	},
	init: () =>{
		this.entity = this.game.add.sprite(100,100, 'dk');
		this.game.physics.arcade.enable(this.entity);
        this.entity.body.bounce.x = 0.3;
        this.entity.body.collideWorldBounds = true;
	},
	setAnimations: () => {
		this.entity.frame = 0;
		this.entity.animations.add('barril', [2,3]);
		this.entity.animations.add('golpear', [1,4]);
		this.cont = 0;
	},
	move: () => {
		if(this.cont == 0){
			this.num = Math.floor((Math.random()) * 2);
		}else if(this.cont < 15){
			if(this.num == 1){
				this.entity.frame = 0;
				this.entity.body.x -= 1;
			}else{
				this.entity.frame = 5;
				this.entity.body.x += 1;
			}
		}else if(this.cont == 15){
			this.entity.animations.play('golpear', 2, true);
		}else{
			if(this.cont == 190){
				this.entity.animations.play('barril', 2, true);
				barrel.addBarrel(this.num);
			}
			if(this.cont >= 240){
				this.entity.frame = 3;
			}
			if(this.cont == 340){
				this.cont = -1;
			}
		}
		this.cont += 1;
	}
}