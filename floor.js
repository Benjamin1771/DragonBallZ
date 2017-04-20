function Floor(){
  this.y = height;
  this.x = 40;
  this.r = 48;
  this.col = color(0);

  this.changeColor = function(){
    this.col = color(random(255), random(255), random(255));
  }

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

  this.display = function(){
    stroke(0);
    fill(this.col);
    rect(this.x, this.y, this.r, this.r);
  }
  this.update = function(){
  }
}
