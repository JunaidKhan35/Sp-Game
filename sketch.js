var spaceShip, spaceShipImg
var bgImg

function setup() {
  createCanvas(800,400);

  bg = createSprite(400,200)
  bg.addImage(bgImg)
  bg.velocityY = 3

  spaceShip = createSprite(400,328,50,50);
  spaceShip.scale = 0.5;
  spaceShip.addImage(spaceShipImg);
  spaceShip.visible = false;

  plane = createSprite(400,200,800,400);
  plane.shapeColor = "black";
  plane.visible = false;

  bulletsG = new Group();
  bulletsG2 = new Group();
  bulletsG3 = new Group();
  enemyShipG = new Group();
  enemyShipG2 = new Group();
  explosionG = new Group();

  gameState = 0;
  score = 0;
  Life = 1;

  Edges = createEdgeSprites();
}

function preload(){
  spaceShipImg = loadImage("images/PC.png");
  bgImg = loadImage("images/space bg.png");
  bulletsImg = loadImage("images/bullets.png");
  bullets2Img = loadImage("images/bullets2.png");
  enemyShipImg = loadImage("images/enemy ship.png");
  enemyShip2Img = loadImage("images/enemy ship2.png");
  explosionAn = loadAnimation("images/explosion1.png","images/explosion2.png","images/explosion3.png","images/explosion4.png","images/explosion5.png");
  lifeImg = loadImage("images/life.png");
  gameOverImg = loadImage("images/gameover.jpg");
  restartImg = loadImage("images/restart.png");
}


function draw() {
  background(bgImg);
  
  drawSprites();

if(gameState === 0){
  background(100,100,89);

  spaceShip.visible = false;

  fill(500,500,100);
  textSize(40);
  text("🔥🔥SpaceShip Battle🔥🔥",190,70);

  textSize(30);
  text("CONTROLS :",15,140);

  textSize(22);
  text("press Left and Right",15,180);
  text("arrow Keys for movement",15,200);

  text("press Space Key",15,225);
  text("to fire bullets",15,245);

  textSize(40);
  fill(1000,500,200);
  text("press s to start the Game!",225,300);

  textSize(150);
  text("🎮",530,215);

 if(keyDown("S") && gameState === 0){
  gameState = 1;
}
}

if(gameState === 1){

  spaceShip.visible = true;
  plane.visible = false;
  bg.velocityY = 3;

  life = createSprite(35,35,15,15);
  life.addImage(lifeImg);
  life.scale = 0.4;

  fill(200,200,50);
  textSize(20);
  text("Score :" + score, 700,380);

  fill(400,200,100);
  textSize(21);
  text(Life,60,40 );

if(bulletsG.isTouching(enemyShipG) || bulletsG.isTouching(enemyShipG2)){
  score = score+1;
}

if(bulletsG2.isTouching(spaceShip)){
  //Life = Life-1;
  //bulletsG2.destroyEach();
  Life = Life-1;
  bulletsG.destroyEach();
} 

if(enemyShipG.isTouching(spaceShip) || enemyShipG2.isTouching(spaceShip)){
  Life = Life-1
  bulletsG2.destroyEach();
  enemyShipG.destroyEach();
  bulletsG3.destroyEach();
  enemyShipG2.destroyEach();
}

  spaceShip.collide(Edges);

if(keyDown("LEFT_ARROW")){
  spaceShip.velocityX = spaceShip.velocityX-2;
}
if(keyDown("RIGHT_ARROW")){
  spaceShip.velocityX = spaceShip.velocityX+2;
}

if(keyDown("SPACE")){
  bullets = createSprite(spaceShip.x-45,spaceShip.y-30,15,15);
  bullets.addImage(bulletsImg);
  bullets.velocityY = -8    
  bulletsG.add(bullets);
}

if(keyDown("SPACE")){
  bullets2 = createSprite(spaceShip.x+45,spaceShip.y-30,15,15);
  bullets2.addImage(bulletsImg);
  bullets2.velocityY = -8;
  bulletsG.add(bullets2);
}

if(frameCount%100 === 0){
  enemyShip = createSprite(Math.round(random(1,800)),-2);
  enemyShip.scale = 0.4;
  enemyShip.addImage(enemyShipImg);
  enemyShip.velocityY = 2;
  
  bullets3 = createSprite(enemyShip.x-31,enemyShip.y,15,15);
  bullets3.addImage(bullets2Img);
  bullets3.velocityY = 3;

  bullets4 = createSprite(enemyShip.x+35,enemyShip.y,15,15);
  bullets4.addImage(bullets2Img);
  bullets4.velocityY = 3;

  enemyShipG.add(enemyShip);
  bulletsG2.add(bullets3);
  bulletsG2.add(bullets4);

}

if(frameCount%180 === 0){
  enemyShip2 = createSprite(Math.round(random(1,800)),-2);
  enemyShip2.scale = 0.5;
  enemyShip2.addImage(enemyShip2Img);
  enemyShip2.velocityY = 3;

  bullets5 = createSprite(enemyShip2.x-31,enemyShip2.y,15,15);
  bullets5.addImage(bullets2Img);
  bullets5.velocityY = 4;

  bullets6 = createSprite(enemyShip2.x+35,enemyShip2.y,15,15);
  bullets6.addImage(bullets2Img);
  bullets6.velocityY = 4;

  bulletsG3.add(bullets5);
  bulletsG3.add(bullets6);
  enemyShipG2.add(enemyShip2);

}

if(bulletsG.isTouching(enemyShipG)){
enemyShipG.destroyEach();
bulletsG2.destroyEach();
}

if(bulletsG.isTouching(enemyShipG2)){
enemyShipG2.destroyEach();
bulletsG3.destroyEach();
}

if(bg.y > 325){
bg.y = height/2;
}

if(Life === 0){
gameState = 2;
}

}

if(gameState === 2){

  plane.visible = true;

  bulletsG.destroyEach();
  bulletsG2.destroyEach();
  bulletsG3.destroyEach();

  enemyShipG.destroyEach();
  enemyShipG2.destroyEach();

  //bg.velocityY = 0

  //resetB = createSprite(400,200);
  //resetB.addImage(restartImg);
  //resetB.scale = 0.8;

  bg.visible = false;
  spaceShip.visible = false;

  textSize(55);
  fill("yellow");
  text("Press R to restart!",170,200);
  
  fill(255,255,255);
  textSize(70);
  text("☠",390,135);

  if(keyDown("R")){
    reset();
  }
}
}

function reset(){
    gameState = 1;
    bg.velocityY = 3;
  //if(bg.y > 325){
  //  bg.y = height/2;
  //  }
    spaceShip.visible = true;
    console.log(gameState);
    Life = 1;
}