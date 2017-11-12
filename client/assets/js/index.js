var game = new Phaser.Game(478, 630, Phaser.CANVAS, '');

var controllers;
var timer;
var win;
var scoreText;
var scContText;
var mainMusic;
var startMusic;

var states = {
    start: {
        preload: function() {
            game.stage.backgroundColor="#ffff";
            game.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');
            game.load.audio('mainMusic','assets/audios/mainMusic.mp3');
        },

        create: function() {
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            var mainText= game.add.bitmapText(game.width/2 - 115,game.height/2,'font','Press [SPACEBAR] to start',16);
            var authorsT = game.add.bitmapText(game.width/2-40,game.height -200,'font','Authors',16);
            var brText = game.add.bitmapText(game.width/2-70,game.height -180,'font','Brian Ramirez',16);
            var jrText = game.add.bitmapText(game.width/2-75,game.height -160,'font','Juan Rodriguez',16);
            var javText = game.add.bitmapText(game.width/2-80,game.height -140,'font','Javier Roncallo',16);
            mainMusic = game.add.audio('mainMusic');
        },

        update: function() {
            if(controllers.isDown){
                game.time.events.add(2000, function() {    game.add.tween(maintText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(maintText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
                game.time.events.add(2000, function() {    game.add.tween(authorsT).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(authorsT).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
                game.time.events.add(2000, function() {    game.add.tween(brText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(brText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
                game.time.events.add(2000, function() {    game.add.tween(jrText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(jrText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
                game.time.events.add(2000, function() {    game.add.tween(javText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(javText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
                game.state.start('main');
            }
        }
    },
    main: {
        preload: function(){
            game.stage.backgroundColor="#ffff";
            game.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');
            game.load.spritesheet('mario', 'assets/sprites/mario.png', 18, 18);
            game.load.spritesheet('dk', donkey.sprites.url, donkey.sprites.x, donkey.sprites.y);
            game.load.spritesheet('pauline', princess.sprites.url, princess.sprites.x, princess.sprites.y);
            game.load.spritesheet('barrel', barrel.sprites.url, barrel.sprites.x, barrel.sprites.y);
            game.load.spritesheet('platform', platform.sprites.url, platform.sprites.x, platform.sprites.y);
            game.load.spritesheet('star', star.sprites.url, star.sprites.x, star.sprites.y);
            game.load.audio('jump','assets/audios/marioJump.wav');
            game.load.audio('marioDies','assets/audios/marioDies.wav');
            game.load.audio('starCollide','assets/audios/starCollide.wav');
            game.load.audio('win','assets/audios/win.wav');
            // if(client.id == null){
            // }
            client.askNewPlayer();
            client.allPlayers();
        },

        create: function() {
            // game.stage.disableVisibilityChangue = true;
            controllers = game.input.keyboard.createCursorKeys();
            scoreText = game.add.bitmapText(12,10,'font','Score',16);
            scContText = game.add.bitmapText(30,30,'font','0',16);
            timer = game.time.create(false);
            barrel.init();
            donkey.init();
            princess.init();
            client.arrayPlayers.forEach((mario)=>{
                mario.init();
                mario.setAnimations();
            });
            client.newPlayer((newPlayer)=>{
                if(newPlayer != null){
                    newPlayer.init();
                    newPlayer.setAnimations(); 
                }
            });
            platform.init();
            star.init();
            donkey.setAnimations();
            princess.setAnimations();
            star.generateStars();
            platform.generateWord();
            swFall = true;
            win = false;
            moveStatusSend = null;
            moveStatus = null;
            mainMusic.play();
            swMovePlayer = null;
        },

        update: function() {
            barrel.startGame();
            donkey.move();
            platform.physics();
            barrel.physics();
            client.location();
            client.arrayPlayers.forEach((mario)=>{
                mario.collides(client.dataId);
                mario.physics(client.dataId);
            });
            princess.move();
            barrel.killBarrel();
            if(swFall){
                setTimer(() => {}, () => {
                    princess.fall();
                    donkey.fall();
                    swFall = false;
                }, 1000);
            }
            client.moveAllPlayers((data)=>{
                if(swMovePlayer != data.move){
                    console.log('id:' + data.id + ' move:' + data.move);
                    if (data.move == 'left'){
                        client.arrayPlayers[data.id].moveLeft();
                    }
                    if (data.move == 'right'){   
                        client.arrayPlayers[data.id].moveRight();
                    }
                    console.log('Touching down :' + client.arrayPlayers[data.id].entity.body.touching.down);
                    if(client.arrayPlayers[data.id].entity.body.touching.down){
                        if(data.move == 'jump0'){
                            client.arrayPlayers[data.id].jump(0);
                        }
                    }else{
                        if(data.move == 'jump1'){
                            client.arrayPlayers[data.id].jump(1);
                        }
                        if(data.move == 'jump-1'){
                            client.arrayPlayers[data.id].jump(-1);
                        }
                    }
                    if(data.move == 'stop'){
                        client.arrayPlayers[data.id].entity.body.velocity.x = 0;
                    }
                    swMovePlayer = data.move;
                }
            });
            scContText.text = score.total;
            if(controllers.up.isUp && controllers.down.isUp && controllers.left.isUp && controllers.right.isUp && moveStatusSend != null){
                moveStatus = 'stop';
            }else{
                if (controllers.left.isDown){
                    client.arrayPlayers[client.id].moveLeft();
                    moveStatus = 'left';
                }
                if (controllers.right.isDown){
                    client.arrayPlayers[client.id].moveRight();
                    moveStatus = 'right';
                }
                if(client.arrayPlayers[client.id].entity.body.touching.down){
                    if(controllers.up.isDown){
                        client.arrayPlayers[client.id].jump(0);
                        moveStatus = 'jump0';
                    }
                }else{
                    if(controllers.right.isDown){
                        client.arrayPlayers[client.id].jump(1);
                        moveStatus = 'jump1';
                    }
                    if(controllers.left.isDown){
                        client.arrayPlayers[client.id].jump(-1);
                        moveStatus = 'jump-1';
                    }
                }
            }
            if(moveStatus != moveStatusSend){
                console.log(moveStatus);
                client.movePlayer(moveStatus);
                moveStatusSend = moveStatus;
            }
        }
    },
    finish: {        
        preload: function() {
            game.stage.backgroundColor="#ffff";
            game.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');
        },
        
        create: function() {
            mainMusic.stop();
            // console.log(win);
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            if(win){
                text = 'YOU WIN';
                xWin = game.width*0.225;
                game.add.bitmapText(game.world.centerX - game.width*0.33, game.world.centerY,'font', 'CONGRATULATIONS!', 36);
            }else{
                text = 'GAME OVER';
                xWin = game.width*0.305;
                game.add.bitmapText(game.world.centerX - game.width*0.17, game.world.centerY,'font', 'SCORE: ' + score.total, 36);
            }
            game.add.bitmapText(game.world.centerX - xWin, game.world.centerY - 100, 'font', text, 56);
            game.add.bitmapText(game.world.centerX - game.width*0.42, game.world.centerY + 100, 'font', 'Press [SPACEBAR] to restart',26);
        },

        update: function() {
            if(controllers.isDown){
                game.state.start('main');
                score.total = 0;
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

client.removePlayer();