class mario {
  constructor(){
    this.sprites = {
      x:18,
      y:18,
      url:'assets/sprites/mario.png'
    };
  }
  init () {
    this.entity = game.add.sprite(0, game.height - 26, 'mario');
    game.physics.arcade.enable(this.entity);
    this.entity.enableBody = true;
    this.entity.body.bounce.y = 0.1;
    this.entity.body.gravity.y = 300;
    this.entity.body.collideWorldBounds = true;
    this.entity.frame = 4;
    mario.move = true;
  }
  setAnimations () {
    this.entity.animations.add('left', [2,3], 5);
    this.entity.animations.add('right', [5,4], 5);
  }
  moveLeft () {
    if(mario.move){
      this.entity.body.velocity.x = -70;
      this.entity.animations.play('left');
    }
  }
  moveRight () {
    if(mario.move){
        this.entity.body.velocity.x = 70;
        this.entity.animations.play('right');
    }
  }
  jump (value) {
    if(mario.move){
        if(value == 1){
            setTimer(() => {
                this.entity.frame = 6;
            }, () => {
                this.entity.frame = 4;
            }, 1);
        }else if(value == -1){
            setTimer(() => {
                this.entity.frame = 1;
            }, () => {
                this.entity.frame = 3;
            }, 1);
        }else{
            game.add.audio('jump').play();
            this.entity.body.velocity.y = -175;
        }
    }
  }
  physics () {
    this.entity.body.velocity.x = 0;
  }
  collides () {
    game.physics.arcade.collide(this.entity, platforms);
    game.physics.arcade.collide(this.entity, barriles, (mario, barrel) => {
        lose(this.entity, game);
    },null, this);
    game.physics.arcade.collide(this.entity, donkeyObject, (mario, donkey) => {
        lose(this.entity, game);
    },null, this);
    game.physics.arcade.collide(this.entity, pauline, (mario, pauline) => {
      if(score.total == 10){
          setTimer(() => {
              mario.move = false;
              if(!win){game.add.audio('win').play();}
              win = true;
              pauline.frame = 4;
          }, () => {
              game.state.start('finish');
          }, 1000);
      }
    },null, this);
  }
}

function lose (object, game){
  setTimer(() => {
    mario.move = false;
    if (object.frame != 0) {game.add.audio('marioDies').play();}
    object.frame = 0;
  }, () => {
      game.state.start('finish');
  }, 1000);
}