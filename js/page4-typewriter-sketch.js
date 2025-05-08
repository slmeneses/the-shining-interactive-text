let typewriterImg;
let lines = [];
let baseLine = "All work and no play makes Jack a dull boy";
let typewriterSize = 250;
let tableHeight = 100;

let scrollOffset = 0;
let scrollSpeed = 0;
let baseScrollSpeed = 0.01;
let isActivated = false;
let typingInterval = 70;
let lastTyped = 0;
let fontSize;

let lastMouseX, lastMouseY;
let mouseMovementTotal = 0;
let maxScrollSpeed = 30;


let showSubtitle = false;
let subtitleText = "''How do you like it?''";
let subtitleIndex = 0;
let subtitleSpeed = 50;
let lastSubtitleTime = 0;
let displayedSubtitle = "";

function preload() {
  typewriterImg = loadImage("img/clear-typewriter.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Courier");
  calculateFontSize();
  textAlign(CENTER, TOP);

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  let linesNeededToFillScreen = floor((height * 0.7) / (fontSize + 10));
  for (let i = 0; i < linesNeededToFillScreen; i++) {
    lines.push(baseLine);
  }
}

function draw() {
  background(245, 240, 220);

  let linesNeededToFillScreen = floor((height * 0.7) / (fontSize + 10));
  let screenIsFilled = lines.length >= linesNeededToFillScreen;


  let dx = abs(mouseX - lastMouseX);
  let dy = abs(mouseY - lastMouseY);
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  if (screenIsFilled) {
    mouseMovementTotal += dx + dy;
  }

  scrollSpeed = baseScrollSpeed;
  if (screenIsFilled) {
    scrollSpeed = min(baseScrollSpeed + mouseMovementTotal * 0.002, maxScrollSpeed);
  }

  if (isActivated) {
    scrollOffset += scrollSpeed;
  }

  let startingY = height * 0.7;


  let lastLineY = startingY - (lines.length - 1) * (fontSize + 10) + scrollOffset;


  let textVisible = lastLineY < height;

  if (isActivated && textVisible && !showSubtitle) {
    if (millis() - lastTyped > typingInterval) {
      lines.push(baseLine);
      lastTyped = millis();
    }
  }

  if (!showSubtitle && isActivated && lastLineY > height) {
    showSubtitle = true;
    lastSubtitleTime = millis();
  }

  if (showSubtitle && subtitleIndex < subtitleText.length) {
    if (millis() - lastSubtitleTime > subtitleSpeed) {
      displayedSubtitle += subtitleText[subtitleIndex];
      subtitleIndex++;
      lastSubtitleTime = millis();
    }
  }


  for (let i = 0; i < lines.length; i++) {
    let y = startingY - (lines.length - i) * (fontSize + 10) + scrollOffset;
    text(lines[i], width / 2, y);
  }


  fill(40, 0, 0);
  noStroke();
  rect(0, height - tableHeight, width, tableHeight);


  imageMode(CENTER);
  image(typewriterImg, width / 2, height - tableHeight, typewriterSize, typewriterSize);


  if (showSubtitle) {
    push();
    textAlign(CENTER, CENTER);
    textFont("Helvetica");
    textStyle(ITALIC);
    textSize(35);
    stroke(0);              
    strokeWeight(4);   
    fill(255, 240, 100);

    drawingContext.shadowColor = 'black';
    drawingContext.shadowBlur = 4;
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;

    text(displayedSubtitle, width / 2, height / 2);

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    pop();
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width / 2, height - tableHeight);
  if (!isActivated && d < typewriterSize / 2 + 40) {
    isActivated = true;
    lastTyped = millis();
    lines.push(baseLine);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateFontSize();
}

function calculateFontSize() {
  let testSize = 10;
  textSize(testSize);
  while (textWidth(baseLine) < width * 0.8 && testSize < 200) {
    testSize++;
    textSize(testSize);
  }
  fontSize = testSize - 1;
  textSize(fontSize);
}
