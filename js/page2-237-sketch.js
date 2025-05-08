// credit to chatgpt :)

let fontColor;
let shadowColor;
let isHoveringDoor = false;


let subtitleText = "“...there ain’t nothing in Room 237. \nBut you ain't got no business\ngoing in there anyway.”";
let charIndex = 0;
let revealSpeed = 0.6;
let revealStarted = false;


let showerLadyImg;
let showerRevealed = false;
let showerStartTime = 0;
let showDuration = 3000; 

function preload() {
  showerLadyImg = loadImage("img/scary-lady.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Times');
  textSize(34);
  textStyle(NORMAL);

  fontColor = color(255, 240, 100); 
  shadowColor = color(0, 0, 0, 150); 
}

function draw() {

  if (showerRevealed) {
    background(0);
    imageMode(CORNER);

    let imgAspect = showerLadyImg.width / showerLadyImg.height;
    let canvasAspect = width / height;

    let drawW, drawH;
    if (imgAspect > canvasAspect) {
      drawH = height;
      drawW = imgAspect * height;
    } else {
      drawW = width;
      drawH = width / imgAspect;
    }

    image(showerLadyImg, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

    if (millis() - showerStartTime > showDuration) {
      showerRevealed = false;
    }
    return;
  }


  background(36, 13, 13); 

  let doorWidth = 130;
  let doorHeight = 230;
  let doorX = width * 0.65;
  let doorY = height * 0.45;


  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 'rgba(0,0,0,0)';


  noStroke();
  fill(255, 240, 100); 
  rect(doorX, doorY, doorWidth, doorHeight, 0); 


  fill(0);
  textAlign(CENTER, TOP);
  textFont('Times');
  textStyle(NORMAL);
  textSize(20);
  text("237", doorX + doorWidth / 2, doorY + 10);


  fill(0);
  ellipse(doorX + doorWidth / 5, doorY + doorHeight * 0.55, 7, 7);


  isHoveringDoor = mouseX > doorX && mouseX < doorX + doorWidth &&
                   mouseY > doorY && mouseY < doorY + doorHeight;

  if (isHoveringDoor) {
    revealStarted = true;
  }

  if (revealStarted && charIndex < subtitleText.length) {
    charIndex += revealSpeed;
  }

  if (isHoveringDoor) {
    drawHoverText();
  }
}

function mousePressed() {
  if (isHoveringDoor && !showerRevealed) {
    showerRevealed = true;
    showerStartTime = millis();
  }
}

function drawHoverText() {
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 13;
  drawingContext.shadowColor = shadowColor.toString();

  stroke(0); 
  strokeWeight(4);
  fill(fontColor);
  textFont('Helvetica');
  textStyle(ITALIC);
  textSize(34);
  textAlign(LEFT, TOP);
  textWrap(WORD);

  let textX = width * 0.20;
  let textY = height * 0.28;
  let wrapWidth = width * 0.8;

  let visibleText = subtitleText.substring(0, floor(charIndex));
  text(visibleText, textX, textY, wrapWidth);

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 'rgba(0,0,0,0)';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

