class mario {
  constructor(){
    this.sprites = {
      x:18,
      y:18,
      url:'assets/sprites/mario.png'
    };
  }
  init () {
    this.object = game.add.sprite(0, game.height - 26, 'mario');
    game.physics.arcade.enable(this.object);
    this.object.enableBody = true;
    this.object.body.bounce.y = 0.1;
    this.object.body.gravity.y = 300;
    this.object.body.collideWorldBounds = true;
    this.object.frame = 4;
    this.move = true;
  }
  setAnimations () {
    this.object.animations.add('left', [2,3], 5);
    this.object.animations.add('right', [5,4], 5);
  }
  moveLeft () {
    if(this.move){
      this.object.body.velocity.x = -70;
      this.object.animations.play('left');
    }
  }
  moveRight () {
      if(this.move){
          this.object.body.velocity.x = 70;
          this.object.animations.play('right');
      }
  }
  jump (value) {
      if(this.move){
          if(value == 1){
              setTimer(() => {
                  this.object.frame = 6;
              }, () => {
                  this.object.frame = 4;
              }, 1);
          }else if(value == -1){
              setTimer(() => {
                  this.object.frame = 1;
              }, () => {
                  this.object.frame = 3;
              }, 1);
          }else{
              game.add.audio('jump').play();
              this.object.body.velocity.y = -175;
          }
      }
  }
  physics () {
      this.object.body.velocity.x = 0;
  }
  collides () {
      game.physics.arcade.collide(this.object, barriles, (mario, barrel) => {
          lose(this.object, game, this.move);
      },null, this);
      game.physics.arcade.collide(this.object, donkeyObject, (mario, donkey) => {
          lose(this.object, game, this.move);
      },null, this);
      game.physics.arcade.collide(this.object, pauline, (mario, pauline) => {
          if(score.total == 10){
              setTimer(() => {
                  move = false;
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

function lose (object, game, move){
    setTimer(() => {
        move = false;
        if (object.frame != 0) {game.add.audio('marioDies').play();}
        object.frame = 0;
    }, () => {
        game.state.start('finish');
    }, 1000);
}
