var star = {
 sprites:{
   x: 16,
   y: 24,
   url: 'assets/sprites/star.png'
 },
 init: () =>{
   stars = game.add.group();
   stars.enableBody = true;
   //gamety = game.add.sprite(0,game.height-38, 'star');
   // game.physics.arcade.enable(stars);
   //gamety.body.collideWorldBounds = true;
 },
 addStar: (x,y) => {
   starO = stars.create(x, y, 'star');
   starO.body.checkCollision.up = false;
   // starO.body.immovable = true;
   // starO.body.moves = false;
   starO.animations.add('main', [1,2,3,2,1]);
   starO.animations.play('main', 8, true);
   //starO.body.enable = false;
 },
 generateStars: () => {
   star.addStar(this.game.width-16,this.game.height-30);
   star.addStar(this.game.width/2-8,this.game.height-118);
   star.addStar(0,this.game.height-358);
   star.addStar(this.game.width-16,this.game.height-358);
   star.addStar(this.game.width/2 - 80,this.game.height-550);
   star.addStar(this.game.width-174,this.game.height-550);
   star.addStar(this.game.width/2-8,this.game.height-214);
   star.addStar(this.game.width/2-8,this.game.height-406);
   star.addStar(0,this.game.height-166);
   star.addStar(this.game.width-16,this.game.height-166);
 }
}
