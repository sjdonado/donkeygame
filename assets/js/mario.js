var mario = {
    sprites:{
        x:16,
        y:16,
        url:'assets/sprites/mario2.png'
    },
    init: function(){
        this.entity = this.game.add.sprite(100, this.game.height-8, 'mario');
        this.game.physics.arcade.enable(this.entity);
        this.entity.body.gravity.y = 300;
        this.entity.body.collideWorldBounds = true;
        this.entity.frame = 4;
        this.entity.enableBody = true;
    },
    setAnimations: function(){
        this.entity.animations.add('left', [2,3], 5);
        this.entity.animations.add('right', [5,4], 5);
    },
    moveLeft: function(){
        this.entity.body.velocity.x = -150;
        this.entity.animations.play('left');
    },
    moveRight: function(){
        this.entity.body.velocity.x = 150;
        this.entity.animations.play('right');
    },
    jump: () => {
        this.entity.body.velocity.y = -350;
    }
}
