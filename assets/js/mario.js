var mario = {
    sprites: {
        x:16,
        y:16,
        url:'assets/sprites/mario2.png'
    },
    init: function(){
        marioObject = this.game.add.sprite(0, screen.availHeight - screen.availHeight*0.19, 'mario');
        this.game.physics.arcade.enable(marioObject);
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
            marioObject.body.velocity.x = -80;
            marioObject.animations.play('left');
        }
    },
    moveRight: function(){
        if(move){
            marioObject.body.velocity.x = 80;
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
        collideBarriles = game.physics.arcade.collide(marioObject, barriles);
        if(collideBarriles){
            lose(marioObject, game);
        }
        collideDonkey = game.physics.arcade.collide(marioObject, donkeyObject);
        if(collideDonkey){
            lose(marioObject, game);
        }
        collidePauline = game.physics.arcade.collide(marioObject, pauline);
        if(collidePauline){
            setTimer(() => {
                move = false;
                pauline.frame = 4;
                win = true;
            }, () => {
                game.state.start('finish');
            }, 1000);
        }
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