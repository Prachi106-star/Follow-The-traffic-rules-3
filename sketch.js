var sunny , vehicle , tree , traffic , lady ;

var sunnyimg , vehicleimg , treeimg , trafficimg , ladyimg , trackImg , carSound , crashSound;  

var gameState = "start";

var vehicleGroup , trafficGroup ;

var ground ;

var death = 0 ; 


var restart ;

function preload(){
   sunnyimg = loadImage("carfinal.png");
   vehicleimg = loadImage("car2.png");
    trafficimg = loadImage("Traffic.png");
    ladyimg = loadImage("walking.png");
    trackImg = loadImage("road.jpg");
    carSound = loadSound("driving.mp3");
   crashSound = loadSound("crah.mp3");
}

function setup(){
    createCanvas(800,800);

    ground = createSprite(400,400,600,800);
    ground.addImage("road",trackImg);
    ground.scale = 4 ;

    sunny = createSprite(400,700,50,50);
    sunny.addImage("sunny",sunnyimg);
    sunny.scale = 0.6;

    vehicleGroup = new Group();
    trafficGroup = new Group();

     restart = createSprite(360,120,10,10);
     restart.visible = false ;
    //sunny.shapeColor = "red";

}

function draw(){
    background("green");

    if ( gameState === "start"){
        background("black");
        textSize(20);
        text("Sunny is a 18 year old boy who wants to give a driving test , but due to this pandamic ",10,100);
        text("he cannot . He also wants to learn the traffic rules . So we need to prepare a game for him ",0,140)
        text("so that he learns the traffic rules",200,180);
        text("Press the up-arrow to start leaning some traffic rules !!" , 150,260);
        text("Use the mouse cursor to move the car horizontally  ", 150 ,300);
        sunny.visible = false ;
        ground.visible = false ;
        if (keyDown(UP_ARROW)){
            gameState = "play" ;
        }
        
    }

 if (gameState === "play"){
    sunny.visible = true ;
    ground.visible = true ; 

    sunny.x = mouseX ;
    ground.velocityY = 6;
    //console.log(ground.y);

    if (ground.y>600){
        ground.y = 400 ;
    }
  
    carSound.loop();

    spawnVehicles();
    spawnTraffic();

    if (vehicleGroup.isTouching(sunny)){
    death = death+1 ;
    vehicleGroup.destroyEach();
    crashSound.loop();
    // console.log(death);
 
    }
  
   if (keyDown("space")){
      gameState = "hold" ;
    // stopCar(); 
   }
   
   if (keyWentUp("space")){
      startCar()
 }
 if (death > 0 && death % 5 === 0){
    gamestate = END;
 }


 }
 if (gameState === "hold"){
   stopCar();
 }

if (gameState === "end") {
    fill ("white");
    textSize(13);
    text ("Game over",150,200);
    restart.visible = true ;

    if(mousePressedOver(restart)){
      reset();
      }      
}


drawSprites();

fill("black");
textSize(50);
text("Death : " + death ,50,50);
}


function spawnVehicles(){
    if (frameCount%80 === 0){
    var vehicle = createSprite(200,0,50,50);
    vehicle.x = random(120,700);
    vehicle.velocityY = 8 ;
    vehicle.lifetime = 260 ;
    vehicle.addImage("car",vehicleimg);
    vehicle.scale = 0.5 ;
    vehicleGroup.add(vehicle);
    }
}

function spawnTraffic(){
    if (frameCount%190 === 0){ 
    var traffic = createSprite(50,0,50,50);
    //vehicle.x = random(50,750);
    traffic.velocityY = 5 ;
    traffic.lifetime = 260 ;
    traffic.addImage("trafic",trafficimg);
    traffic.scale = 0.5 ;
    trafficGroup.add(traffic);
    }
}

function stopCar(){
    
    ground.velocityY = 0 ;
    trafficGroup.setVelocityYEach(0);
    sunny.velocityY = 0 ;
    vehicleGroup.setVelocityYEach(0)  ;
    trafficGroup.setLifetimeEach(-1);
    vehicleGroup.setLifetimeEach(-1);
}

function startCar(){
    
    ground.velocityY =  -6 ;
    trafficGroup.setVelocityYEach(-5);
    sunny.velocityY = 0 ;
    vehicleGroup.setVelocityYEach(0)  ;
  
}

function reset(){
    gamestate = "play" ;
    restart.visible=false;
    vehicleGroup.destroyEach();
    tarfficGroup.destroyEach();
    //score = 0;
    death = 0;
   
     
  }
  