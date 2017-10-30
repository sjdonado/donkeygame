var game = new Phaser.Game((screen.availWidth - screen.availWidth*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

var controllers;
var timer;
var win = false;

mario.game = game;
donkey.game = game;
princess.game = game;
barrel.game = game;
platform.game = game;
star.game = game;

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
            game.load.spritesheet('pauline', princess.sprites.url, princess.sprites.x, princess.sprites.y);
            game.load.spritesheet('barrel', barrel.sprites.url, barrel.sprites.x, barrel.sprites.y);
            game.load.spritesheet('platform', platform.sprites.url, platform.sprites.x, platform.sprites.y);
            game.load.spritesheet('star', star.sprites.url, star.sprites.x, star.sprites.y);
        },

        create: function() {
            controllers = game.input.keyboard.createCursorKeys();
            timer = game.time.create(false);
            barrel.init();
            donkey.init();
            mario.init();
            princess.init();
            platform.init();
            star.init();
            donkey.setAnimations();
            mario.setAnimations();
            princess.setAnimations();
            star.generateStars();
            platform.generateWord();
            //star.move();
        },

        update: function() {
            barrel.startGame();
            donkey.move();
            platform.physics();
            barrel.physics();
            mario.physics();
            mario.collides();
            princess.move();
            barrel.killBarrel();
            star.physics();
            if (controllers.left.isDown){
                mario.moveLeft();
            }
            if (controllers.right.isDown){
                mario.moveRight();
            }
            if(marioObject.body.touching.down){
                if(controllers.up.isDown){
                    mario.jump(0);
                }
            }else{
                if(controllers.right.isDown){
                    mario.jump(1);
                }
                if(controllers.left.isDown){
                    mario.jump(-1);
                }
            }
        }
    },
    finish: {
        preload: function() {
            game.stage.backgroundColor="#fafafa";
        },

        create: function() {
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },

        update: function() {
            if(controllers.isDown){
                game.state.start('main')
            }
        }
    }
}

game.state.add('start', states['start']);
game.state.add('main', states['main']);
game.state.add('finish', states['finish']);
game.state.start('start');

function setTimer(doBefore, doAfter, time){
    doBefore();
    timer.add(time, doAfter, this);
    timer.start();
}