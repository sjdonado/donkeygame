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
   starO.frame = 10;
   starO.animations.add('main', [1,2,3,4,3,2,1]);
   starO.animations.play('main',10,true);
 },
 generateStars: () => {
   star.addStar(this.game.width-16,this.game.height-37);
   star.addStar(this.game.width/2-8,this.game.height-126);
   star.addStar(0,this.game.height-366);
   star.addStar(this.game.width-16,this.game.height-366);
   star.addStar(this.game.width/2 - 80,this.game.height-558);
   star.addStar(this.game.width-174,this.game.height-558);
   star.addStar(this.game.width/2-8,this.game.height-222);
   star.addStar(this.game.width/2-8,this.game.height-414);
   star.addStar(0,this.game.height-174);
   star.addStar(this.game.width-16,this.game.height-174);
 },
 physics: () =>{
   this.game.physics.arcade.collide(marioObject, stars);
 }
}
