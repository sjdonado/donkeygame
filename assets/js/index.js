var game = new Phaser.Game((screen.availWidth - screen.availWidth*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var controllers;
mario.game = game;
donkey.game = game;
pauline.game = game;
barrel.game = game;
platform.game = game;

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
            game.load.spritesheet('dk', donkey.sprites.url, donkey.sprites.x, donkey.sprites.y);
            game.load.spritesheet('pauline', pauline.sprites.url, pauline.sprites.x, pauline.sprites.y);
            game.load.spritesheet('barrel', barrel.sprites.url, barrel.sprites.x, barrel.sprites.y);
            game.load.spritesheet('platform', platform.sprites.url, platform.sprites.x, platform.sprites.y);
        },

        create: function() {
            controllers = game.input.keyboard.createCursorKeys();
            barrel.init();
            donkey.init();
            mario.init();
            platform.init();
            //pauline.init();
            donkey.setAnimations();
            mario.setAnimations();
            pauline.setAnimations();
            platform.generateWord();
        },

        update: function() {
            donkey.move();
            platform.physics();
            mario.physics();
            mario.collides();
            if (controllers.left.isDown){
                mario.moveLeft();
            }
            if (controllers.right.isDown){
                mario.moveRight();
            }
            if(controllers.up.isDown && marioObject.body.touching.down){
                mario.jump();
            }
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
game.state.add('finish', states['finish']);
game.state.start('start');
