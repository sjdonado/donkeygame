var game = new Phaser.Game((screen.availWidth - screen.availHeight*0.3)/2 , screen.availHeight - screen.availHeight*0.15, Phaser.CANVAS, '');

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


            //world's paltforms:
            //ground's platform
            platform.addGround();

            //donkey's platform
            platform.addPlatform(this.game.width/2 - 79,this.game.height-528,10);

            //pauline's platform
            platform.addPlatform(this.game.width/2 -40,40,5);

            //rest
            //left
            platform.addPlatform(0,this.game.height-48,11);
            platform.addPlatform(0,this.game.height-144,8);
            platform.addPlatform(0,this.game.height-240,11);
            platform.addPlatform(152,this.game.height-288,2);
            platform.addPlatform(0,this.game.height-336,1);
            platform.addPlatform(72,this.game.height-336,3);
            platform.addPlatform(0,this.game.height-432,8);
            platform.addPlatform(128,this.game.height-480,3);
            platform.addPlatform(this.game.width/2 - 132,this.game.height-566,2);

            //center
            platform.addPlatform(86,this.game.height-96,25);
            platform.addPlatform(this.game.width/2-79,this.game.height-192,10);
            platform.addPlatform(this.game.width/2-63,this.game.height-288,8);
            platform.addPlatform(this.game.width/2-143,this.game.height-384,18);

            //right
            platform.addPlatform(this.game.width-176,this.game.height-48,11);
            platform.addPlatform(this.game.width-128,this.game.height-144,8);
            platform.addPlatform(this.game.width-176,this.game.height-240,11);
            platform.addPlatform(this.game.width-183,this.game.height-288,2);
            platform.addPlatform(this.game.width-120,this.game.height-336,3);
            platform.addPlatform(this.game.width-16,this.game.height-336,1);
            platform.addPlatform(this.game.width-125,this.game.height-432,8);
            platform.addPlatform(this.game.width-176,this.game.height-480,3);
            platform.addPlatform(this.game.width/2 + 102,this.game.height-566,2);

        },

        update: function() {
            donkey.move();
            //pauline.move();
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
