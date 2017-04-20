var player;
var poles = [];
var coins = [];
var ncoins = [];
var score = 0;
var d;
var mySong;
var collect2;
var jump;
var img;
var coinImg;

function preload() {
  mySong = loadSound('sounds/strike.mp3');
  collect2 = loadSound('sounds/piston-2.mp3');
  oops = loadSound('sounds/moon.mp3');
  jump = loadSound('sounds/flash-3.mp3');
  img = loadImage("glasses.png");
  coinImg = loadImage("smile.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight*.8);
  player = new Player();
  floor = new Floor();
    ncoins.push(new Coin());
  coins.push(new Coin());
  poles.push(new Pole());
}

 function draw(){

  background(105, 204, 200);


  console.log(score);
  for (var i = poles.length-1; i >= 0; i--) {
    poles[i].show();
    poles[i].update();

    if (poles[i].hits(player)) {

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
        //  console.log('plus 1!');
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


  player.update();
  floor.update();

  player.display();
  floor.display();


 if(frameCount % 100 == 0) {
     poles.push(new Pole());
 }
 if(frameCount % 100 == 0) {
     coins.push(new Coin());
 }
 if(frameCount % 180 == 0) {
     ncoins.push(new Coin());
 }


  player.hitCheck = function() {
    // console.log('hitcheck');
      if (player.intersects(floor)){
        //  coins.changeColor();
         player.up();
         jump.play();
       }

  }

    text(score, 40, 40, 100);
    textSize(40);
}
// End Draw //
// End Draw //
// End Draw //


function touchStarted() {
  if (touches){
      player.hitCheck();
  }
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

  this.display = function(){
    image(img, this.x, this.y-60, this.r, this.r);
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
//////////////////////////////

function Pole() {
    this.bottom = random(height/2);
    this.x = width;
    this.w = 20;
    this.speed = 5;

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
      // this.lift = -screen.height/16;

      this.highlight = false;
      console.log("this" + player.x);
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
