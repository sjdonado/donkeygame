var game = new Phaser.Game((screen.availWidth - screen.availHeight*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var controllers;
mario.game = game;
dk.game = game;

var states = {
    start: {
        preload: function() {
            game.stage.backgroundColor="#e52325";
        },

        create: function() {
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },

        update: function() {
            if(controllers.isDown){
                game.state.start('main')
            }
        }
    },
    main: {
        preload: function() {
            game.stage.backgroundColor="#ffff";
            game.load.spritesheet('mario', mario.sprites.url, mario.sprites.x, mario.sprites.y);
            game.load.spritesheet('dk', dk.sprites.url, dk.sprites.x, dk.sprites.y);
        },

        create: function() {
            controllers = game.input.keyboard.createCursorKeys();
            mario.init();            
            mario.setAnimations();
            dk.init();
            dk.setAnimations();
        },

        update: function() {
            mario.entity.body.velocity.x = 0;
            if(controllers.left.isDown){
                mario.moveLeft();
            }
            else if(controllers.right.isDown){
                mario.moveRight();
            }else{
                mario.motionLess();
            }
            dk.move();
        }
    },
    finish: {
        preload: function() {
            game.stage.backgroundColor="#fafafa";
        },

        create: function() {    
        },

        update: function() {
        }
    }
}

game.state.add('start', states['start']);
game.state.add('main', states['main']);

game.state.start('start');
