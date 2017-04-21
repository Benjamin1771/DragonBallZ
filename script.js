var player;
var poles = [];
var coins = [];
var doubles = [];
var frowns = [];

var score = 10;

var d;
var collect1;
var collect2;
var collectbad;
var jump;

var player0icon;
var player1icon;
var player2icon;
var player3icon;
var coinImg;
var doubleImg;
var frownImg;

var heartImg1;
var heartObj1;

var heartImg2;
var heartObj2;

var heartImg3;
var heartObj3;


var pauseGame = true;

var radius1 = 20;
var radius2 = 20;
var radius3 = 20;


function preload() {
  collect1 = loadSound('sounds/collectsound.mp3');
  collect2 = loadSound('sounds/collectsound2.mp3');
  oops = loadSound('sounds/moon.mp3');
  collectbad = loadSound('sounds/hitsound.mp3');
  jump = loadSound('sounds/flash-3.mp3');

  player0icon = loadImage("assets/sad.png");
  player1icon = loadImage("assets/smile.png");
  player2icon = loadImage("assets/bigsmile.png");
  player3icon = loadImage("assets/woo.png");
  coinImg = loadImage("assets/smile.png");
  doubleImg = loadImage("assets/bigsmile.png");
  frownImg = loadImage("assets/sad.png");

  heartImg1 = loadImage("assets/heart1.png");
  heartObj1 = loadImage("assets/blank1.png");

  heartImg2 = loadImage("assets/heart2.png");
  heartObj2 = loadImage("assets/blank2.png");

  heartImg3 = loadImage("assets/heart3.png");
  heartObj3 = loadImage("assets/blank3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight*.8);
  player = new Player();
  floor = new Floor();

  coins.push(new Coin());
  doubles.push(new Double());
  frowns.push(new Frown());
  poles.push(new Pole());


  setTimeout(function(){
    pauseGame = false;
  }, 1300);


}


// Player Class //
// Player Class //
// Player Class //
function Player(){
  this.y = height/4;
  this.x = 65;
  this.r = 58;

  this.gravity = 2;
  this.lift = -windowHeight/10;
  this.velocity = 0;

  this.intersects = function(other) {
    var d = dist(this.x, this.y-25, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }


  this.update = function(){
  }

  this.up = function(){
    this.velocity += this.lift;
    this.velocity += -this.gravity;
  }

  this.update = function(){
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height){
      this.y=height;
      this.velocity = 0;
    }

    if (this.y < 0){
      this.y=0;
      this.velocity = 0;
    }
  }
}

//////////////////////////////
    //Poles Class
    //Poles Class
    //Poles Class
//////////////////////////////
function Pole() {
    this.bottom = random(height/2)+30;
    this.x = width;
    this.w = 20;
    this.speed = 7;

    if (score > 10){
      this.speed = 8;
    }
    if (score >= 20){
      this.speed = 9;
    }
    if (score >= 35){
      this.speed = 10;
    }
    if (score >= 45){
      this.speed = 11;
    }
    if (score >= 60){
      this.speed = 13;
    }

    this.highlight = false;

    this.hits = function(player) {
      if (player.y > height - this.bottom) {
        if (player.x+20 > this.x && player.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      return false;
      this.highlight = false;
    }

    this.show = function() {
        fill(255);
      if (this.highlight == true) {
        fill(255, 0, 0);
        // console.log('-1');
        if ( !oops.isPlaying() ) {
            oops.play();
            // console.log('minus 1');
            score--;

          }
      }
      rect(this.x, height-this.bottom, this.w, this.bottom);
    }

    this.update = function() {
      this.x -= this.speed;
    }

    this.offscreen = function() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
}

// Coin Class //
// Coin Class //
// Coin Class //
function Coin() {
      this.bottom = 400;
      this.x = width;
      this.r = 40;
      this.y = windowHeight/4;
      this.speed = 6;

      if(score > 15){
        this.speed = 7;
      }
      if(score > 25){
        this.speed = 9;
      }
      if(score > 35){
        this.speed = 11;
      }

      this.highlight = false;
      // console.log("this" + player.x);
      this.hits = function(player) {
        if (player.y < 275 && this.x > 45 && this.x < 85) {
            this.highlight = true;
            return true;
        }
        return false;
        this.highlight = false;
      }

      this.show = function() {

        if (this.highlight) {
            this.r = 1;
        }
        image(coinImg, this.x, this.y, this.r, this.r);
      }

      this.update = function() {
        this.x -= this.speed;
      }

      this.offscreen = function() {
        if (this.x < -this.w) {
          return true;
        } else {
          return false;
        }
      }
  }

  // Double Class //
  // Double Class //
  // Double Class //
  function Double() {
        this.bottom = 400;
        this.x = width;
        this.r = 40;
        this.y = windowHeight/4;
        this.speed = 6;

        if(score > 20){
          this.speed = 8;
        }
        if(score > 30){
          this.speed = 10;
        }
        if(score > 40){
          this.speed = 12;
        }

        this.highlight = false;
        // console.log("this" + player.x);
        this.hits = function(player) {
          if (player.y < 275 && this.x > 45 && this.x < 85) {
              this.highlight = true;
              return true;
          }
          return false;
          this.highlight = false;
        }

        this.show = function() {

          if (this.highlight) {
              this.r = 1;
          }
          image(doubleImg, this.x, this.y, this.r, this.r);
        }

        this.update = function() {
          this.x -= this.speed;
        }

        this.offscreen = function() {
          if (this.x < -this.w) {
            return true;
          } else {
            return false;
          }
        }
    }
// Frown Class //
// Frown Class //
// Frown Class //
function Frown() {
      this.bottom = 400;
      this.x = width;
      this.r = 40;
      this.y = windowHeight/4;
      this.speed = 8;

      if(score > 20){
        this.speed = 9;
      }
      if(score > 30){
        this.speed = 11;
      }
      if(score > 40){
        this.speed = 13;
      }

      this.highlight = false;
      // console.log("this" + player.x);
      this.hits = function(player) {
        if (player.y < 275 && this.x > 45 && this.x < 85) {
            this.highlight = true;
            return true;
        }
        return false;
        this.highlight = false;
      }

      this.show = function() {

        if (this.highlight) {
            this.r = 1;
        }
        image(frownImg, this.x, this.y, this.r, this.r);
      }

      this.update = function() {
        this.x -= this.speed;
      }

      this.offscreen = function() {
        if (this.x < -this.w) {
          return true;
        } else {
          return false;
        }
      }
  }
  // end of classes //

 function draw(){
  background(125, 204, 200);



  var heart1 = image(heartImg1, width/1.3, height/10, radius1, radius1);

  function removeHeart1() {
      heart1 = image(heartObj1, width/1.3, height/10, radius1, radius1);
  }
  if (score < 10) {
    removeHeart1();
    console.log("remove1");
  }

  var heart2 = image(heartImg2, width/1.5, height/10, radius2, radius2);

  function removeHeart2() {
    heart2 = image(heartObj2, width/1.5, height/10, radius2, radius2);
  }
  if (score < 15) {
    removeHeart2();
    console.log("remove2");
  }

  var heart3 = image(heartImg3, width/1.75, height/10, radius3, radius3);

  function removeHeart3() {
      heart3 = image(heartObj3, width/1.75, height/10, radius3, radius3);
  }
  if (score < 20) {
    removeHeart3();
    console.log("remove1");
  }


// Player //
// Player //
// Player //
  function player0(){
  player.display = function(){
    image(player0icon, player.x, player.y-60, player.r, player.r);
    }
  }

  if (score < 10){
    player0();
  }

  function player1(){
  player.display = function(){
    image(player1icon, player.x, player.y-60, player.r, player.r);
    }
  }

  if (score >= 10){
    player1();
  }

  function player2(){
      player.display = function(){
        image(player2icon, player.x, player.y-60, player.r, player.r);
        // console.log();
      }
  }
  if (score >= 15){
    player2();
  }

  function player3(){
      player.display = function(){
        image(player3icon, player.x, player.y-60, player.r, player.r);
        // console.log(score);
      }
  }
  if (score >= 20){
    player3();
  }

  player.update();
  floor.update();
  player.display();
  floor.display();

  if (pauseGame) return;


// Poles //
// Poles //
// Poles //
  // console.log(score);
  for (var i = poles.length-1; i >= 0; i--) {
    poles[i].show();
    poles[i].update();

    if (poles[i].hits(player)) {
      // poles.splice(i, 1);
    }

    if (poles[i].offscreen()) {
      poles.splice(i, 1);
    }
  }


// Coins //
// Coins //
// Coins //
  for (var i = coins.length-1; i >= 0; i--) {
    coins[i].show();
    coins[i].update();

    if (coins[i].hits(player) == true ) {
       if ( !collect1.isPlaying() ) {
           collect1.play();
           score++;
         }
    }

    if (coins[i].offscreen()) {
      coins.splice(i, 1);
    }
  }



// Doubles //
// Doubles //
// Doubles //
  for (var i = doubles.length-1; i >= 0; i--) {
    doubles[i].show();
    doubles[i].update();

    if (doubles[i].hits(player) == true ) {
      if ( !collect2.isPlaying() ) {
          collect2.play();
          score++;
          // console.log('add');
        }
    }

    if (doubles[i].offscreen()) {
      doubles.splice(i, 1);
    }
  }



// Frown //
// Frown //
// Frown //
  for (var i = frowns.length-1; i >= 0; i--) {
    frowns[i].show();
    frowns[i].update();

    if (frowns[i].hits(player) == true ) {
      if ( !collectbad.isPlaying() ) {
          collectbad.play();
          score--;
          // console.log('add');
        }
    }

    if (frowns[i].offscreen()) {
      frowns.splice(i, 1);
    }
  }


// Add //
   if(frameCount % 105 == 0) {
       poles.push(new Pole());
   }
   if(frameCount % 110 == 0) {
       coins.push(new Coin());
   }
   if(frameCount % 180 == 0) {
       doubles.push(new Double());
   }
   if(frameCount % 150 == 0) {
       frowns.push(new Frown());
   }



// Check Variable //
  player.hitCheck = function() {
      if (player.intersects(floor)){
         player.up();
         jump.play();
       }

  }

    text(score, 40, 40, 100);
    textSize(40);

    if (score < 1){
      window.location.href = "lost.html";
    }
}
// End Draw //
// End Draw //
// End Draw //


function touchStarted() {
  if (touches){
      player.hitCheck();
  }
}
