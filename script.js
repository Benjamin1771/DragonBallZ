var player;
var poles = [];
var coins = [];
var ncoins = [];
// var hearts = [];
var score = 10;
var d;
var mySong;
var collect2;
var jump;
var player0icon;
var player1icon;
var player2icon;
var player3icon;
var coinImg;
var pauseGame = true;


function preload() {
  mySong = loadSound('sounds/strike.mp3');
  collect2 = loadSound('sounds/piston-2.mp3');
  oops = loadSound('sounds/moon.mp3');
  jump = loadSound('sounds/flash-3.mp3');
  player0icon = loadImage("sad.png");
  player1icon = loadImage("sunglasses.png");
  player2icon = loadImage("smile.png");
  player3icon = loadImage("woo.png");
  coinImg = loadImage("smile.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight*.8);
  player = new Player();
  floor = new Floor();
  // hearts.push(new Heart());
  ncoins.push(new Coin());
  coins.push(new Coin());
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
  this.x = 105;
  this.r = 58;

  this.gravity =2;
  this.lift = -windowHeight/10;
  this.velocity = 0;

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
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
    this.bottom = random(height/2)+50;
    this.x = width;
    this.w = 20;
    this.speed = 5;

    if (score > 10){
      this.speed = 7;
    }
    if (score > 20){
      this.speed = 9;
    }
    if (score > 30){
      this.speed = 11;
    }
    if (score > 40){
      this.speed = 13;
    }
    if (score > 50){
      this.speed = 15;
    }

    this.highlight = false;

    this.hits = function(player) {
      if (player.y > height - this.bottom) {
        if (player.x+25 > this.x && player.x < this.x + this.w) {
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

            if (score < 8) {
              // thirdHeart.r = 0;
            }
            else if (score < 6) {
              // secondHeart.r = 0;
            }
            else if (score < 4) {
              // firstHeart.r = 0;
            }
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

      this.highlight = false;
      // console.log("this" + player.x);
      this.hits = function(player) {
        if (player.y < 280 && this.x > 90 && this.x < 110) {
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

  // end of classes //

 function draw(){
  background(125, 204, 200);

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

  for (var i = coins.length-1; i >= 0; i--) {
    coins[i].show();
    coins[i].update();

    if (coins[i].hits(player) == true ) {
       if ( !mySong.isPlaying() ) {
           mySong.play();
           score++;
         }
    }

    if (coins[i].offscreen()) {
      coins.splice(i, 1);
    }
  }

  for (var i = ncoins.length-1; i >= 0; i--) {
    ncoins[i].show();
    ncoins[i].update();

    if (ncoins[i].hits(player) == true ) {
      if ( !collect2.isPlaying() ) {
          collect2.play();
          // console.log('plus 1!');
        }
    }

    if (ncoins[i].offscreen()) {
      ncoins.splice(i, 1);
    }
  }

   if(frameCount % 80 == 0) {
       poles.push(new Pole());
   }
   if(frameCount % 100 == 0) {
       coins.push(new Coin());
   }
   if(frameCount % 150 == 0) {
       ncoins.push(new Coin());
   }





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
