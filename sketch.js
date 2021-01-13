var END = 0;
var PLAY = 1;
var monkey, monkey_running, monkey_collided;
var banana, bananaGroup, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime = 0;
var gameState = PLAY;



function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stopped", monkey_collided);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();


}


function draw() {
  background("green");
  textSize(15);
  fill("white");

  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.round(frameCount / 50);
  text("Survival Time: " + survivalTime, 20, 20);

  if (ground.x < 0) {
      ground.x = ground.width / 2;

    } 
  
  if(gameState===PLAY) {
    
    if (keyDown("space") && monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    if(bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
    } 
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      }

  obstacle();
  banana();
    
  if (gameState===END) {
    reset();
    console.log("GAMEOVER");
    // survivalTime=0;
    // monkey.changeAnimation("stopped", monkey_collided);
    // monkey.velocityX = 0;
    // monkey.velocityY = 0;
    // console.log(gameState);
    // obstacleGroup.destroyEach();
    // bananaGroup.destroyEach();
  }

  }

  drawSprites();
}


function banana() {
  if (frameCount % 110 === 0) {
    var banana = createSprite(400, Math.round(random(120, 200)));
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }

}

function obstacle() {
  if (frameCount % 220 === 0) {
    var obstacle = createSprite(400, 325);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}

function reset() {
    survivalTime=0;
    monkey.changeAnimation("stopped", monkey_collided);
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    console.log(gameState);
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
}


