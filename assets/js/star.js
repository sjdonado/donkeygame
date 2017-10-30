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
   //game.physics.arcade.enable(gamety);
   //gamety.body.collideWorldBounds = true;
 },
 addStar: (x,y) => {
   starO = stars.create(x, y, 'star');
   starO.body.immovable = true;
   starO.animations.add('main', [1,2,3,2,1]);
   starO.animations.play('main', 8, true);
 },
 generateStars: () => {
   star.addStar(game.width-16,game.height-40);
   star.addStar(game.width/2-8,game.height-129);
   star.addStar(0,game.height-366);
   star.addStar(game.width-16,game.height-369);
   star.addStar(game.width/2 - 80,game.height-561);
   star.addStar(game.width-174,game.height-561);
   star.addStar(game.width/2-8,game.height-225);
   star.addStar(game.width/2-8,game.height-417);
   star.addStar(0,game.height-177);
   star.addStar(game.width-16,game.height-177);
 },
 physics: () =>{
   game.physics.arcade.collide(marioObject, stars, (mario, star) => {
      star.kill();
      score.total += 1;
      score.log();
   }, null, this);
 }
}
