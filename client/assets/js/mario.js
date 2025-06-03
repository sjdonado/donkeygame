class mario {
  constructor(id, x, y){
    this.id = id;
    this.sprites = {
      x:18,
      y:18,
      isMario: true
    };
    // Always set to Mario in single player mode
    this.sprites.isMario = true;
    this.move = true;
    this.x = x || 100;
    this.y = y == 0 ? game.height - 26 : (y || game.height - 26);
  }
  init () {
    try {
      if(this.sprites.isMario){
        this.entity = game.add.sprite(this.x, this.y, 'mario');
      }else{
        this.entity = game.add.sprite(this.x, this.y, 'luiggi');
      }
      game.physics.arcade.enable(this.entity);
      this.entity.enableBody = true;
      this.entity.body.bounce.y = 0.1;
      this.entity.body.gravity.y = 300;
      this.entity.body.collideWorldBounds = true;
      this.entity.frame = 4;
    } catch (e) {
      console.error("Error initializing mario entity:", e);
    }
  }
  setAnimations () {
    this.entity.animations.add('left', [2,3]);
    this.entity.animations.add('right', [5,4]);
  }
  moveLeft (type) {
    if(this.move){
      this.entity.body.velocity.x = -70;
      if(type){
        this.entity.animations.play('left', 5);
      }else{
        this.entity.animations.play('left', 5, true);
      }
    }
  }
  moveRight (type) {
    if(this.move){
      this.entity.body.velocity.x = 70;
      if(type){
        this.entity.animations.play('right', 5);
      }else{
        this.entity.animations.play('right', 5, true);
      }
    }
  }
  jump (value) {
    if(this.move){
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
  physics (clientID) {
    try {
      if(clientID == this.id && this.entity && this.entity.body){
        this.entity.body.velocity.x = 0;
      }
    } catch (e) {
      console.error("Error in physics:", e);
    }
  }
  collides (clientID) {
    try {
      if (!this.entity || !this.entity.body) {
        return;
      }
      
      game.physics.arcade.collide(this.entity, platforms);
      if(clientID == this.id){
        game.physics.arcade.collide(this.entity, barriles, (mario, barrel) => {
          lose(this, game);
        },null, this);
        game.physics.arcade.collide(this.entity, donkeyObject, (mario, donkey) => {
          lose(this, game);
        },null, this);
        game.physics.arcade.collide(this.entity, stars, (mario, star) => {
          star.body = null;
          star.destroy();
          game.add.audio('starCollide').play();
          score.total += 1;
        }, null, this);
        game.physics.arcade.collide(this.entity, pauline, (mario, pauline) => {
          if(score.total == 10){
            move = this.move;
            setTimer(() => {
                move = false;
                if(!win){game.add.audio('win').play();}
                win = true;
                princess.fall();
                pauline.frame = 4;
            }, () => {
                game.state.start('finish');
            }, 1000);
            this.move = move;
          }
        },null, this);
      }
    } catch (e) {
      console.error("Error in collides:", e);
    }
  }
}

function lose (object, game){
  setTimer(() => {
    if(object.move && object.entity){
      object.move = false;
      if (object.entity.frame != 0) {game.add.audio('marioDies').play();}
      object.entity.frame = 0;
    }
  }, () => {
    game.state.start('finish');
  }, 900);
}
