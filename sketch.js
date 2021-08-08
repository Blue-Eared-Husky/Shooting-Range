var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2;
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreboard.html("Score: " + score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  if(gameState===1){
    gun.y=mouseY  
    if (frameCount % 80 === 0){
      drawblueBalloon();
    }
  
    if (frameCount % 100 === 0){
      drawredBalloon();
    }

    if (blueBubbleGroup.collide(bulletGroup)){
      handleBalloonCollision(blueBubbleGroup);
    }

    if (redBubbleGroup.collide(bulletGroup)){
      handleBalloonCollision(redBubbleGroup);
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }

    if (redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }

    drawSprites();
  }
}

function keyPressed(){
  if (keyCode === 32){
    shootBullet();
  }
}

function shootBullet(){
  var bullet = createSprite(227,gun.y-35);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 10;
  bullet.lifetime = 1000;

  bulletGroup.push(bullet);
}

function drawblueBalloon(){
  var rany = random(100,700);
  var balloon = createSprite(850,rany);
  balloon.addImage(blueBubbleImg);
  balloon.scale = 0.1;
  balloon.velocityX = -5;
  balloon.lifetime = 1000;

  blueBubbleGroup.push(balloon);
}

function drawredBalloon(){
  var rany = random(100,700);
  var balloon = createSprite(850,rany);
  balloon.addImage(redBubbleImg);
  balloon.scale = 0.125;
  balloon.velocityX = -5;
  balloon.lifetime = 1000;

  redBubbleGroup.push(balloon);
}

function handleBalloonCollision(bubbleGroup){
  if (life > 0){
    score++;
    var blast = createSprite(bulletGroup.x,bulletGroup.y);
    blast.addImage(blastImg);
    blast.lifetime = 20;
    blast.scale = 0.2;

    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
  }
}

function handleGameOver(bubbleGroup){
  life-=1;
  bubbleGroup.destroyEach();
  if (life === 0){
    gameState = 2;
    swal({
      title: 'Game Over',
      text: 'Oops you lost the game....!!!',
      text: 'Your score is ' + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks for Playing"
    })
  }
}