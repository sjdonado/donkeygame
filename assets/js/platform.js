var platform = {
	sprites:{
		x: 16,
		y: 8,
		url: 'assets/sprites/platform.png'
	},
	init: () =>{
		platforms = this.game.add.group();
		platforms.enableBody = true;
    addPlatform(0,this.game.height-8,3,1);
	},
	addPlatform: (x,y,scaleX,scaleY) => {
		platformO = platforms.create(x, y, 'barrel');
		platformO.inmovable = true;
    platformO.scale.setTo(scaleX,scaleY)
	}
}
