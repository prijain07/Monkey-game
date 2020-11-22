var PLAY = 1;
var END = 0;
var gameState = PLAY;


   var monkey , monkey_running;
   var banana ,bananaImage, obstacle, obstacleImage;
   var foodGroup,obstacleGroup;
   var score,ground,survivalTime;



function preload(){
  
  
        monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
        bananaImage = loadImage("banana.png");
        obstacleImage = loadImage("obstacle.png");
 }

function setup() {
  
     createCanvas(400,400);
     foodGroup=createGroup();
     obstacleGroup=createGroup();
  
  //creating monkey
     monkey=createSprite(50,250,10,10);
     monkey.addAnimation("moving",monkey_running);
     monkey.scale=0.1;
     
     ground=createSprite(70,350,800,10);
  ground.velocityX=-4;
     ground.x=ground.width/2;
     console.log(ground.x);
  
     score =0;
  survivalTime=0;
  
}
function draw() {
    background(180);
  
   

 
  stroke("black");
  textSize=20;
  fill("black");
  text("Score:"+score,10,50);
  
  stroke("black");
  textSize=20;
  fill("black");
    text("survivalTime:"+survivalTime,200,50);
 
  monkey.collide(ground);
  if (gameState === PLAY){
    survivalTime=Math.ceil(frameCount/frameRate());
  
 if(ground.x<0){
  ground.x=ground.width/2;      
}
   if(keyDown("space")){
  monkey.velocityY=-12;
}


  if (foodGroup.isTouching(monkey))
     {
      foodGroup.destroyEach();
      score=score+1;
      }
    
    monkey.velocityY=monkey.velocityY+0.8;
        
       obstacleGroup.setLifetimeEach(-1);
        spawnobstacle();
        spawnbanana() ;
    
  if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
  if (gameState===END){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
 
    monkey.lifetime=0;
    ground.lifetime=0; 
    stroke("red");
    fill("red");
    text("Game Over",100,200);
    stroke("black");
    fill("black");
    text("Monkey is dead",200,200);
  }


drawSprites();
  
}

function spawnbanana(){
if(frameCount%80===0){
   banana = createSprite(300,60,05,10);
    banana.addImage("banana",bananaImage);
    //banana.x = banana.width /2;
    banana.scale=0.1; 
  banana.velocityX=-5;
  banana.y=Math.round(random(120,200));
  banana.lifetime=200;
  foodGroup.add(banana);
}
}

function spawnobstacle(){

if (frameCount % 60 === 0){
   var obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -(6 + score/100);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.lifetime=350; 
  obstacleGroup.add(obstacle);
}
}

