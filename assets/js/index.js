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

function change_state(state){
    game.state.start(state);
}

game.state.add('start', states['start']);
game.state.add('main', states['main']);
game.state.add('finish', states['finish']);

change_state('start');

console.log(game.state.checkState('main'))
console.log(game.state.checkState('finish'))