var mario = {
    sprites:{
        x:37,
        y:34,
        url:'assets/sprites/mario.png'
    },
    init: function(){
        this.entity = this.game.add.sprite(this.sprites.x, 100, 'mario');
        this.game.physics.arcade.enable(this.entity);
        this.entity.body.bounce.y = 0.3;
        this.entity.body.gravity.y = 300;
        this.entity.body.collideWorldBounds = true;
        this.entity.frame = 4;
    },
    setAnimations: function(){
        this.entity.animations.add('left', [1,2,3], 10, true);
        this.entity.animations.add('right', [4,5,6], 10, true);
    },
    moveLeft: function(){
        this.entity.body.velocity.x = -100;
        this.entity.animations.play('left')
    },
    moveRight: function(){
        this.entity.body.velocity.x = 100;
        this.entity.animations.play('right')
    },
    motionLess: function(){
        this.entity.body.velocity.x = 0;
        this.entity.frame = 4;
    }
}