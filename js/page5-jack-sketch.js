let frozenJack;
let subtitleText = "''Remember, it’s just like pictures in a book...''";
let secondText = "''it isn’t real.''";
let charIndex = 0;
let revealSpeed = 0.6;

let fontColor;
let shadowColor;

function preload() {
  frozenJack = loadImage('img/frozen-jack.jpg'); // make sure filename matches upload
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fontColor = color(255, 240, 100); // yellow
  shadowColor = color(0, 0, 0, 150); // semi-transparent black
}

function draw() {
  let fadeFactor = constrain(map(mouseX, width / 2, width, 0, 1), 0, 1); // 0 to 1

  // Background transition
  let bgR = lerp(120, 255, fadeFactor);
  let bgG = lerp(0, 255, fadeFactor);
  let bgB = lerp(0, 255, fadeFactor);
  background(bgR, bgG, bgB);

  // IMAGE: scale to fill canvas, maintain aspect ratio, crop if needed
  if (frozenJack) {
    let imgAspect = frozenJack.width / frozenJack.height;
    let canvasAspect = width / height;

    let drawWidth, drawHeight;
    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
    } else {
      drawHeight = height;
      drawWidth = height * imgAspect;
    }

    let x = (width - drawWidth) / 2;
    let y = (height - drawHeight) / 2;

    imageMode(CORNER);
    tint(255, fadeFactor * 255); // fade in
    image(frozenJack, x, y, drawWidth, drawHeight);
    noTint();
  }

  // TEXT FADE CALCULATION
  let firstTextAlpha = (1 - fadeFactor) * 255;
  let secondTextAlpha = fadeFactor * 255;

  // Shared text style
  textFont('Helvetica');
  textStyle(ITALIC);
  textSize(34);
  textAlign(CENTER, CENTER);

  // === FADE OUT: "remember..." ===
  if (firstTextAlpha > 5) {
    if (charIndex < subtitleText.length) {
      charIndex += revealSpeed;
    }

    let visible = subtitleText.substring(0, floor(charIndex));

    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = shadowColor.toString();

    fill(0, firstTextAlpha);
    stroke(0, firstTextAlpha);
    strokeWeight(4);
    text(visible, width / 2, height / 2);

    noStroke();
    fill(fontColor.levels[0], fontColor.levels[1], fontColor.levels[2], firstTextAlpha);
    text(visible, width / 2, height / 2);
  }

  // === FADE IN: "it isn’t real." ===
  if (secondTextAlpha > 5) {
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = shadowColor.toString();

    fill(0, secondTextAlpha);
    stroke(0, secondTextAlpha);
    strokeWeight(4);
    text(secondText, width / 2, height / 2);

    noStroke();
    fill(fontColor.levels[0], fontColor.levels[1], fontColor.levels[2], secondTextAlpha);
    text(secondText, width / 2, height / 2);
  }

  // Reset shadow
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "rgba(0,0,0,0)";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
