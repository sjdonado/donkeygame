var mario = {
    sprites: {
        x:18,
        y:18,
        url:'assets/sprites/mario.png'
    },
    init: function(){
        marioObject = game.add.sprite(0, game.height - 8, 'mario');
        game.physics.arcade.enable(marioObject);
        marioObject.enableBody = true;
        marioObject.body.bounce.y = 0.1;
        marioObject.body.gravity.y = 300;
        marioObject.body.collideWorldBounds = true;
        marioObject.frame = 4;
        move = true;
    },
    setAnimations: function(){
        marioObject.animations.add('left', [2,3], 5);
        marioObject.animations.add('right', [5,4], 5);
    },
    moveLeft: function(){
        if(move){
            marioObject.body.velocity.x = -70;
            marioObject.animations.play('left');
        }
    },
    moveRight: function(){
        if(move){
            marioObject.body.velocity.x = 70;
            marioObject.animations.play('right');
        }
    },
    jump: (value) => {
        if(move){
            if(value == 1){
                setTimer(() => {
                    marioObject.frame = 6;
                }, () => {
                    marioObject.frame = 4;
                }, 1);
            }else if(value == -1){
                setTimer(() => {
                    marioObject.frame = 1;
                }, () => {
                    marioObject.frame = 3;
                }, 1);
            }else{
                marioObject.body.velocity.y = -175;
            }
        }
    },
    physics: () => {
        marioObject.body.velocity.x = 0;
    },
    collides: () => {
        game.physics.arcade.collide(marioObject, barriles, (mario, barrel) => {
            lose(marioObject, game);
        },null, this);
        game.physics.arcade.collide(marioObject, donkeyObject, (mario, donkey) => {
            lose(marioObject, game);
        },null, this);
        game.physics.arcade.collide(marioObject, pauline, (mario, pauline) => {
            if(score.total == 10){
                setTimer(() => {
                    move = false;
                    win = true;
                    pauline.frame = 4;
                }, () => {
                    game.state.start('finish');
                }, 1000);
            }
        },null, this);
    }
}

function lose(marioObject, game){
    setTimer(() => {
        move = false;
        marioObject.frame = 0;
    }, () => {
        game.state.start('finish');
    }, 1000);
}
