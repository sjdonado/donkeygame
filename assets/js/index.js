var game = new Phaser.Game((screen.availWidth - screen.availHeight*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var controllers;
mario.game = game;
donkey.game = game;
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
            game.load.spritesheet('barrel', barrel.sprites.url, barrel.sprites.x, barrel.sprites.y);
            game.load.spritesheet('platform', platform.sprites.url, platform.sprites.x, platform.sprites.y);
        },

        create: function() {
            controllers = game.input.keyboard.createCursorKeys();
            barrel.init();
            donkey.init();
            mario.init();
            platform.init();
            donkey.setAnimations();
            mario.setAnimations();

            platform.addGround();
            //platform.addPlatform(16,this.game.height-8,3,1);
        },

        update: function() {
            donkey.move();
            mario.entity.body.velocity.x = 0;
            if (controllers.left.isDown){
                mario.moveLeft();
            }
            if (controllers.right.isDown){
                mario.moveRight();
            }
            if(controllers.up.isDown && mario.entity.body.touching.down){
                mario.jump();
            }
            platform.physics();
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
