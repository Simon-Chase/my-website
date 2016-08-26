var fillVal = 126;
function draw() {
  fill(fillVal);
  rect(25, 25, 50, 50);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    fillVal = 255;
  } else if (keyCode == DOWN_ARROW) {
    fillVal = 0;
  }
  return false; // prevent default
}
