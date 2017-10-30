var star = {
 sprites:{
   x: 16,
   y: 32,
   url: 'assets/sprites/star.png'

 },
 init: () =>{
   stars = this.game.add.group();
   stars.enableBody = true;
   //this.entity = this.game.add.sprite(0,this.game.height-38, 'star');
   //this.game.physics.arcade.enable(this.entity);
   //this.entity.body.collideWorldBounds = true;
 },
 addStar: (x,y) => {
   starO = stars.create(x, y, 'star');
   starO.body.immovable = true;
   starO.animations.add('main', [0,1,2,3,4,3,2,1,0]);
   starO.animations.play('main', 10, true);
 },
 generateStars: () => {
   star.addStar(this.game.width-16,this.game.height-40);
   star.addStar(this.game.width/2-8,this.game.height-129);
   star.addStar(0,this.game.height-366);
   star.addStar(this.game.width-16,this.game.height-369);
   star.addStar(this.game.width/2 - 80,this.game.height-561);
   star.addStar(this.game.width-174,this.game.height-561);
   star.addStar(this.game.width/2-8,this.game.height-225);
   star.addStar(this.game.width/2-8,this.game.height-417);
   star.addStar(0,this.game.height-177);
   star.addStar(this.game.width-16,this.game.height-177);
 },
 physics: () =>{
   this.game.physics.arcade.collide(marioObject, stars, (mario, star) => {
      star.kill();
      score.total += 1;
      score.log();
   }, null, this);
 }
}
