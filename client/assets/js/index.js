var game = new Phaser.Game(478, 630, Phaser.CANVAS, '');

var controllers;
var timer;
var win;
var scoreText;
var scContText;
var mainMusic;
var startMusic;
var mainText;
var authorsT;
var brText;
var jrText;
var javText;
var logo;
var tweenVar;
var resetText;
var text;
var msg;

var states = {
    start: {
        preload: function() {
            game.stage.backgroundColor="#ffff";
            game.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');
            game.load.audio('mainMusic','assets/audios/mainMusic.mp3');
            game.load.image('logo', 'assets/imgs/logo.png');
        },

        create: function() {
            logo = game.add.image(90, 60, 'logo');
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            mainText= game.add.bitmapText(game.width/2 - 115,game.height/2 +50,'font','Press [SPACEBAR] to start',16);
            authorsT = game.add.bitmapText(game.width/2-40,game.height -160,'font','Authors',16);
            brText = game.add.bitmapText(game.width/2-70,game.height -140,'font','Brian Ramirez',16);
            jrText = game.add.bitmapText(game.width/2-75,game.height -120,'font','Juan Rodriguez',16);
            javText = game.add.bitmapText(game.width/2-80,game.height -100,'font','Javier Roncallo',16);
            mainMusic = game.add.audio('mainMusic');
            tweenVar = game.add.tween(mainText).to( { alpha: 0 }, 1000, "Linear", true,0,-1,true);
        },

        update: function() {
            if(controllers.isDown){
              mainStateAnimation();
              var timert = game.time.create(true);
              timert.add(1500, ()=>{game.state.start('main');}, this);
              timert.start();
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
            client.askNewPlayer();
            client.allPlayers();
        },

        create: function() {
            game.stage.disableVisibilityChangue = true;
            controllers = game.input.keyboard.createCursorKeys();
            scoreText = game.add.bitmapText(12,10,'font','Score',16);
            scContText = game.add.bitmapText(30,30,'font','0',16);
            lvlText = game.add.bitmapText(game.width - 62,10,'font','Level',16);
            lvlContText = game.add.bitmapText(game.width - 45,30,'font', lvl.total + '',16);
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
            moveStatusSend = null;
            moveStatus = null;
            win = false;
            mainMusic.play();
            swMovePlayer = null;
        },

        update: function() {
            barrel.startGame();
            donkey.move();
            platform.physics();
            barrel.physics();
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
                if(data != null && swMovePlayer != data.move){
                    console.log('id:' + getIndex(data.id) + ' move:' + data.move);
                    if (data.move == 'left'){
                        client.arrayPlayers[getIndex(data.id)].moveLeft(false);
                    }
                    if (data.move == 'right'){
                        client.arrayPlayers[getIndex(data.id)].moveRight(false);
                    }
                    // console.log('Touching down :' + client.arrayPlayers[getIndex(data.id)].entity.body.touching.down);
                    if(client.arrayPlayers[getIndex(data.id)].entity.body.touching.down){
                        if(data.move == 'jump0'){
                            client.arrayPlayers[getIndex(data.id)].jump(0);
                        }
                    }else{
                        if(data.move == 'jump1'){
                            client.arrayPlayers[getIndex(data.id)].moveRight(false);
                            client.arrayPlayers[getIndex(data.id)].entity.animations.stop();
                            client.arrayPlayers[getIndex(data.id)].jump(1);
                        }
                        if(data.move == 'jump-1'){
                            client.arrayPlayers[getIndex(data.id)].moveLeft(false);
                            client.arrayPlayers[getIndex(data.id)].entity.animations.stop();
                            client.arrayPlayers[getIndex(data.id)].jump(-1);
                        }
                    }
                    if(data.move == 'stop'){
                        client.arrayPlayers[getIndex(data.id)].entity.body.velocity.x = 0;
                        client.arrayPlayers[getIndex(data.id)].entity.animations.stop();
                        if(swMovePlayer == 'right'){
                            client.arrayPlayers[getIndex(data.id)].entity.frame = 4;
                        }
                        if(swMovePlayer == 'left'){
                            client.arrayPlayers[getIndex(data.id)].entity.frame = 3;
                        }
                    }
                    swMovePlayer = data.move;
                }
            });
            scContText.text = score.total;
            if(controllers.up.isUp && controllers.down.isUp && controllers.left.isUp && controllers.right.isUp && moveStatusSend != null){
                moveStatus = 'stop';
            }else{
                if (controllers.left.isDown){
                    client.arrayPlayers[client.id].moveLeft(true);
                    moveStatus = 'left';
                }
                if (controllers.right.isDown){
                    client.arrayPlayers[client.id].moveRight(true);
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
            client.location();
        }
    },
    finish: {
        preload: function() {
            game.stage.backgroundColor="#ffff";
            game.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');
        },

        create: function() {
            mainMusic.stop();
            client.reset();
            if(win){
                lvl.total++;
                lvl.barrels *= lvl.total;
            }
            // console.log(win);
            controllers = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            if(win){
                text = 'YOU WIN';
                xWin = game.width*0.225;
                msg = game.add.bitmapText(game.world.centerX - game.width*0.33, game.world.centerY,'font', 'CONGRATULATIONS!', 36);
            }else{
                text = 'GAME OVER';
                xWin = game.width*0.305;
                msg = game.add.bitmapText(game.world.centerX - game.width*0.17, game.world.centerY,'font', 'SCORE: ' + score.total, 36);
            }
            text = game.add.bitmapText(game.world.centerX - xWin, game.world.centerY - 100, 'font', text, 56);
            resetText = game.add.bitmapText(game.world.centerX - game.width*0.42, game.world.centerY + 100, 'font', 'Press [SPACEBAR] to restart',26);
            tweenVar = game.add.tween(resetText).to( { alpha: 0 }, 1000, "Linear", true,0,-1,true);
        },

        update: function() {
            if(controllers.isDown){
                tweenVar.stop();
                game.add.tween(text).to({y: 0}, 1500, Phaser.Easing.Linear.None, true); game.add.tween(text).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                game.add.tween(resetText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true); game.add.tween(resetText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                game.add.tween(msg).to({y: 0}, 1500, Phaser.Easing.Linear.None, true); game.add.tween(msg).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                score.total = 0;
                var timert = game.time.create(true);
                timert.add(1500, ()=>{game.state.start('main');}, this);
                timert.start();
            }
        }
    }
}

game.state.add('start', states['start']);
game.state.add('main', states['main']);
game.state.add('finish', states['finish']);
game.state.start('start');

function setTimer(doBefore, doAfter, time){
    doBefore(mainText,authorsT);
    timer.add(time, doAfter, this);
    timer.start();
}

function mainStateAnimation(){
  tweenVar.stop();
  game.add.tween(mainText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(mainText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(authorsT).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(authorsT).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(brText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(brText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(jrText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(jrText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(javText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(javText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(logo).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
  game.add.tween(logo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
}

client.removePlayer();
