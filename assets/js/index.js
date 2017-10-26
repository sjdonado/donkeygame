var game = new Phaser.Game((screen.availWidth - screen.availHeight*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var start_state = {
	preload: function() {
		game.stage.backgroundColor="#e52325";
	},

	create: function() {	
	},

	update: function() {
	}
};

game.state.add('start', start_state);
game.state.start('start');