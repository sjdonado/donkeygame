var mario = {
    sprites:{
        x:16,
        y:16,
        url:'assets/sprites/mario2.png'
    },
    init: function(){
        marioObject = this.game.add.sprite(0, 0, 'mario');
        this.game.physics.arcade.enable(marioObject);
        marioObject.enableBody = true;
        marioObject.body.bounce.y = 0.1;
        marioObject.body.gravity.y = 300;
        marioObject.body.collideWorldBounds = true;
        marioObject.frame = 4;
    },
    setAnimations: function(){
        marioObject.animations.add('left', [2,3], 5);
        marioObject.animations.add('right', [5,4], 5);
    },
    moveLeft: function(){
        marioObject.body.velocity.x = -150;
        marioObject.animations.play('left');
    },
    moveRight: function(){
        marioObject.body.velocity.x = 150;
        marioObject.animations.play('right');
    },
    jump: () => {
        marioObject.body.velocity.y = -200;
    },
    physics: ()=>{
        marioObject.body.velocity.x = 0;
    }
}
