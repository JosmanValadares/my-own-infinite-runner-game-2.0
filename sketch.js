var PLAY = 1;
var END = 0;
var gameState = PLAY;

var running, runner;
var dog ,dogrun, dogstop;
var jumping, falling;
var ground, groundImg;
var inviG;
var obstacleGroup, obstacle1, obstacle2;
var bird,birdGroup, birdImage;

var score = 0;

var jumpSound, dieSound;

function preload(){
running = loadAnimation("RUNNING1.png", "RUNNING2.png", "RUNNING3.png", "RUNNING4.png");
jumping = loadAnimation("JUMP1.png", "JUMP2.png","JUMP3.png","JUMP4.png");
dogrun = loadAnimation("dog1.png", "dog2.png", "dog3.png", "dog4.png", "dog5.png", "dog6.png");

falling = loadImage("FALL3.png");
groundImg = loadImage("ground1.jpg");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
dogstop = loadImage("dog.png");
birdImage = loadImage("crow.png");

jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");

}

function setup() {
    //creating canvas
 createCanvas(600,300);

//the runner
runner = createSprite (120,240,20,50);
runner.addAnimation("P_run",running);
runner.addAnimation("P_jump",jumping);
runner.addAnimation("P_fall",falling);
runner.scale = 0.8;
runner.setCollider("rectangle",0,0,10,41)

dog = createSprite(50,350,20,50);
dog.addAnimation("dogrun", dogrun);
dog.addAnimation("dogstop", dogstop);
dog.scale = 0.8;

//ground
ground = createSprite(600,150,100,100);
ground.addImage("ground", groundImg);
ground.x = ground.width/2;

obstacleGroup = new Group; 
birdGroup = new Group;

//invisible ground
inviG = createSprite(200,270,400,10);
inviG.visible = false;
}

function draw() {
 background(300);

 

  
 if(gameState === PLAY){
   // ground.velocityX = -(4 + 3* score/100);

   spawnBirds();
 
   if( frameCount%10 ===0){
    score= score+1
  }
   
    if (ground.x < 0){
        ground.x = ground.width/2;
    }

   // if(keyDown("SPACE"&& runner.y >= 260)) {
     //   runner.velocityY = 120;
       // jumpSound.play();
     //   runner.addAnimation("P_jump", jumping)
   // }
if(keyDown(UP_ARROW)&& runner.y>= 240){
   // runner.changeAnimation("P_jump", jumping);
    runner.velocity.y = -18;
    jumpSound.play();


}
  runner.depth += ground.depth;
  dog.depth += ground.depth;
    //console.log(runner.y);


    runner.velocityY = runner.velocityY + 0.8;
    dog.velocityY = dog.velocityY + 0.8;

    dog.y = runner.y;
    

    spawnObstacles();


   if(obstacleGroup.isTouching(runner)){
        gameState = END;
        dieSound.play();
      
    }
}
else if (gameState === END) {
   
   runner.changeAnimation("P_fall", falling);
   dog.changeAnimation("dogstop", dogstop);

 
  
  
   ground.velocityX = 0;
   runner.velocityY = 0;
   dog.velocityY = 0;

 obstacleGroup.setLifetimeEach(-1);
 birdGroup.setLifetimeEach(-1);
 
  
  obstacleGroup.setVelocityXEach(0);
  birdGroup.setVelocityXEach(0);
 
  if(keyDown("DOWN_ARROW")) {
   reset();
 }

 
 }

 runner.collide(inviG);
 dog.collide(inviG);




    drawSprites();

    fill ("black")
    textSize(14);
 text ("PRESS 'DOWN ARROW' KEY TO RESTART", 10,10);
 text("PRESS 'UP ARROW' KEY TO JUMP" , 10,22);

 text("Score: "+ score, 500,30);
    
 
}

function reset(){
    gameState = PLAY;
  
    //gameOver.visible = false;
    //restart.visible = false;
  
    obstacleGroup.destroyEach();
    birdGroup.destroyEach();
  
    runner.changeAnimation("P_run", running);
    dog.changeAnimation("dogrun", dogrun);
  
    score = 0;

}


function spawnObstacles(){



    if (frameCount % 150 === 0){
        var obstacle = createSprite(600,250,10,40);
        obstacle.velocityX = -4;
        runner.depth += obstacle.depth;

        obstacle.setCollider("rectangle",0,0,100,200);

        var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
        default:break
    }
    obstacle.scale = 0.3;
    obstacle.lifetime = 400;

   //obstacle.debug= true

    obstacleGroup.add(obstacle);
}
}


function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(30,120));
    bird.addImage(birdImage);
    bird.scale = 0.5;
    bird.velocityX = -3;
    
     //assign lifetime to the variable
    bird.lifetime = 400;
    
    //adjust the depth
    bird.depth = runner.depth;
    runner.depth = runner.depth + 1;
    
    //add each cloud to the group
    birdGroup.add(bird);
  }
}

