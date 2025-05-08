let subtitleText = "''I think a lot of things happened in this particular \n hotel over the years... and not all of them were good.''";
let fontSize = 34;
let fontColor;
let shadowColor;
let fontStyle = 'italic';
let fontFamily = 'Helvetica';
let shadowOffsetX = 2;
let shadowOffsetY = 2;
let shadowBlur = 13;

let isHovered = false;
let hasStarted = false;
let charIndex = 0;

let normalSpeed = 0.6;
let slowSpeed = 0.05;

let bgImg;

let textOutlineWeight = 2; 

function preload() {
  bgImg = loadImage("img/overlook-1.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(fontFamily);
  textStyle(fontStyle);
  fontColor = color(255, 240, 100);
  shadowColor = color(0, 0, 0, 150);
  textSize(fontSize);
}

function draw() {

  imageMode(CORNER);
  let imgAspect = bgImg.width / bgImg.height;
  let canvasAspect = width / height;
  let drawW, drawH;

  if (imgAspect > canvasAspect) {
    drawH = height;
    drawW = imgAspect * height;
  } else {
    drawW = width;
    drawH = width / imgAspect;
  }

  image(bgImg, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);


  isHovered = (mouseX > width / 2 && mouseX < width);
  if (isHovered) hasStarted = true;

  if (hasStarted && charIndex < subtitleText.length) {
    let currentChar = subtitleText.charAt(floor(charIndex));
    if (currentChar === ".") {
      charIndex += slowSpeed;
    } else {
      charIndex += normalSpeed;
    }
  }


  drawingContext.shadowOffsetX = shadowOffsetX;
  drawingContext.shadowOffsetY = shadowOffsetY;
  drawingContext.shadowBlur = shadowBlur;
  drawingContext.shadowColor = shadowColor.toString();

  let wrapWidth = width * 0.9;
  let visibleText = subtitleText.substring(0, floor(charIndex));


  stroke(0); 
  strokeWeight(4); 
  fill(fontColor);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(visibleText, width / 2 - wrapWidth / 2, height / 2, wrapWidth);


  noStroke();
  fill(fontColor);
  text(visibleText, width / 2 - wrapWidth / 2, height / 2, wrapWidth);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
