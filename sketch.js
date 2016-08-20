/***************
 * TODO:
 * About Page
 * Works Page
 * Contact Page
***************/


var state;
var buttons;
var mouse;
var setting;
var w = 255;
var sz;

function setup() {
  var density = displayDensity();
  pixelDensity(density);
  mouse = createVector(mouseX, mouseY);
  state = "menu";
  createCanvas(windowWidth, windowHeight);
  loadBackground();
  buttons = {
    "menu": [new Button(-120, 150, "About", "about"), new Button(0, 190, "Works", "works"), new Button(120, 150, "Contact", "contact")],
    "works": [new Button(-width/2, height/2 - 50, "Back", "menu")],
    "about": [new Button(-width/2, height/2 - 50, "Back", "menu")],
    "contact": [new Button(-width/2, height/2 - 50, "Back", "menu")],
  }
  sz = min(width, height)/1050;
  textAlign(CENTER, CENTER);
}

function loadBackground() {
  background(20);
  for (var x = 0; x < width; x += 4) {
    for (var y = 0; y < height; y += 4) {
      var n = noise(x/600, y/600);
      if (n > 0.4) {
        fill(20 + (n - 0.4) * 100);
        noStroke();
        rect(x, y, 4, 4);
      }
    }
  }
  setting = get(0, 0, width, height);
}

function hexagon(xPos, yPos, size, rot, fillCol, strokeCol, st) {
    angleMode(DEGREES);
    fill(fillCol);
    stroke(strokeCol);
    strokeWeight(st);
    beginShape();
    for (var r = 0 + rot; r < 360 + rot; r += 60) {
        var x = size/2 * cos(r) + xPos;
        var y = size/2 * sin(r) + yPos;
        vertex(x, y);
    }
    endShape(CLOSE);
}

function logo(x, y, s) {
    push();
    translate(x, y);
    scale(s);
    
    hexagon(0, 50, 220, 90, color(0, 0, 0, 0), color(255), 4);
    hexagon(0, 50, 200, 90, color(0, 0, 0, 0), color(255), 4);
    
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(0, 50, 173, 55);
    
    quad(-40, 25, 40, 25, 20, -140, -20, -140);
    
    fill(0, 0, 0, 10);
    quad(-40, 23, 0, 25, 0, -140, -20, -140);
    rect(-55, 50, 62, 55);
    
    quad(-40, 14, -24, 25, -20, 25, -20, -140);
    
    fill(255);
    rect(-10, -150, 10, 10);
    rect(10, -150, 10, 10);
    rect(0, -153, 30, 5);
    
    triangle(-25, -160, 25, -160, 0, -175);
    textFont("pt sans");
    textSize(27);
    textAlign(CENTER, CENTER);
    fill(0);
    text("SIMON", -40, 52);
    fill(120, 115, 120);
    text("CHASE", 45, 52);
    
    strokeWeight(1);
    stroke(255, 255, 255);
    line(-50, 100, -30, 100);
    line(50, 100, 30, 100);
    noStroke();
    fill(255);
    textSize(10);
    text("Since 2016", 0, 100);
    
    pop();
}

function draw() {
  image(setting, 0, 0, width, height);
  cursor(ARROW);
  
  push();
  translate(width/2, height/2);
  mouse.set((mouseX - width/2) / sz, (mouseY - height/2) / sz);
  scale(sz);
  
  switch (state) {
    case "menu":
      hexagon(0, 10, 780 + sin(frameCount*5)*20, frameCount/4, color(0, 0, 0, 0), color(255, 255, 255, 40), 9);
      hexagon(0, 10, 720 + cos(frameCount*5)*20, frameCount/4, color(0, 0, 0, 0), color(255, 255, 255, 40), 9);
      
      logo(0, -60, 1);
    break;
  }
  
  for (var i in buttons[state]) {
    buttons[state][i].display();
  }
  
  fill(255);
  textFont("asap");
  textSize(20);
  noStroke();
  text("Logo by Karsten Anderson", width/2 - 40, height/2 + 20);
  
  fill(255, 255, 255, w);
  rect(-width, -height, width*2, height*2);
  
  fill(0);
  text(w, 0, 0);
  
  pop();
  
  w /= 1.1;
  if (w <= 0) {
    w = 0;
  }
}

function Button(x, y, txt, dest) {
  this.x = x;
  this.y = y;
  this.txt = txt;
  this.dest = dest;
  this.col = 255;
  
  this.display = function() {
    noStroke();
    fill(255, 255, 255, 255 - this.col);
    ellipse(this.x, this.y, 110, 110);
    
    stroke(255);
    noFill();
    strokeWeight(3);
    ellipse(this.x, this.y, 110, 110);
    
    fill(this.col);
    noStroke();
    textFont("asap");
    textSize(22);
    text(this.txt, this.x, this.y + 1);
    
    if (dist(this.x, this.y, mouse.x, mouse.y) < 110/2) {
      cursor(HAND);
      this.col -= 15;
    } else {
      this.col += 15;
    }
    
    this.col = constrain(this.col, 0, 255);
  }
  
  this.onClick = function() {
    if (dist(mouse.x, mouse.y, this.x, this.y) < 110/2) {
      w = 255;
      state = this.dest;
    }
  }
};

function mouseClicked() {
  for (var i in buttons[state]) {
    buttons[state][i].onClick();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sz = min(width, height)/1050;
}
