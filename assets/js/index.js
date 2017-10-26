var game = new Phaser.Game((screen.availWidth - screen.availHeight*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var controllers;

var states = {
    start: {
        preload: function() {
            game.stage.backgroundColor="#e52325";
        },

        create: function() {
            controllers = game.input.keyboard.createCursorKeys();
        },

        update: function() {
        }
    },
    main:{
        preload: function() {
            game.stage.backgroundColor="#ffff";
        },

        create: function() {    
        },

        update: function() {
        }
    },
    finish:{
        preload: function() {
            game.stage.backgroundColor="#fafafa";
        },

        create: function() {    
        },

        update: function() {
        }
    }
}

function change_state(start_state, pause_state){
    game.state.pause(pause_state);
    game.state.resume(start_state);
}

game.state.add('start', states['start']);
game.state.add('main', states['main']);
game.state.add('finish', states['finish']);
game.state.start('start');
game.state.start('main');
game.state.start('finish');
game.state.pause('main');
game.state.pause('finish');
