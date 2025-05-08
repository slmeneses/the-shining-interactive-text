let player;
let mazePath = [];
let pathHeight;
let carpet;

let deadGirls = [];
let currentDeadImage = 0;
let showDeadImage = false;
let deadImageStartTime = 0;
let imageCooldown = false;
let cooldownStartTime = 0;
let cooldownDuration = 1500; 

let subtitles = [
  {
    text: "''Come play with us Danny...",
    trigger: 0.05,
    charIndex: 0,
    revealed: false,
    xAlign: "left",
    xOffset: 0.05,
    yOffset: 0.20
  },
  {
    text: "forever...",
    trigger: 0.5,
    charIndex: 0,
    revealed: false,
    xAlign: "left",
    xOffset: 0.45,
    yOffset: 0.8
  },
  {
    text: "...and ever''",
    trigger: 0.8,
    charIndex: 0,
    revealed: false,
    xAlign: "left",
    xOffset: 0.8,
    yOffset: 0.3
  }
];

let revealSpeed = 0.4;
let fontColor;
let shadowColor;

function preload() {
  carpet = loadImage("img/overlook-rug.png");
  deadGirls[0] = loadImage("img/dead-girl-1.png");
  deadGirls[1] = loadImage("img/dead-girl-2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont("Helvetica");
  textStyle(ITALIC);
  fontColor = color(255, 240, 100);
  shadowColor = color(0, 0, 0, 150);
  pathHeight = height * 0.15;

  mazePath = [
    { x: 0.0, yOffset: -0.08, w: 0.20 },
    { x: 0.10, yOffset: -0.01, w: 0.10 },
    { x: 0.10, yOffset: 0.08, w: 0.30 },
    { x: 0.30, yOffset: 0.00, w: 0.10 },
    { x: 0.30, yOffset: -0.07, w: 0.10 },
    { x: 0.30, yOffset: -0.12, w: 0.40 },
    { x: 0.60, yOffset: -0.05, w: 0.10 },
    { x: 0.60, yOffset: 0.06, w: 0.30 },
    { x: 0.80, yOffset: -0.03, w: 0.50 }
  ];

  player = {
    x: width * 0.03,
    y: height / 2,
    r: 27,
    speed: 5
  };
}

function draw() {
  background(36, 13, 13);
  pathHeight = height * 0.12;

  if (showDeadImage) {
    let img = deadGirls[currentDeadImage];
    let canvasAspect = width / height;
    let imgAspect = img.width / img.height;

    let drawW, drawH;
    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = width / imgAspect;
    } else {
      drawH = height;
      drawW = height * imgAspect;
    }

    imageMode(CENTER);
    image(img, width / 2, height / 2, drawW, drawH);

    if (millis() - deadImageStartTime > 500) {
      showDeadImage = false;
      currentDeadImage = (currentDeadImage + 1) % deadGirls.length;
      imageCooldown = true;
      cooldownStartTime = millis();
    }
    return;
  }

  if (imageCooldown && millis() - cooldownStartTime > cooldownDuration) {
    imageCooldown = false;
  }


  for (let section of mazePath) {
    let x = width * section.x;
    let y = height / 2 + height * section.yOffset;
    let w = width * section.w;
    let h = pathHeight;

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(x, y, w, h);
    drawingContext.clip();

    let tileW = carpet.width * 0.35;
    let tileH = carpet.height * 0.35;

    for (let i = 0; i < width; i += tileW) {
      for (let j = 0; j < height; j += tileH) {
        image(carpet, i, j, tileW, tileH);
      }
    }

    drawingContext.restore();
  }


  fill(100, 180, 255);
  ellipse(player.x, player.y, player.r * 2);


  let inMaze = false;
  for (let section of mazePath) {
    let x = width * section.x;
    let y = height / 2 + height * section.yOffset;
    let w = width * section.w;
    if (
      player.x > x &&
      player.x < x + w &&
      player.y > y &&
      player.y < y + pathHeight
    ) {
      inMaze = true;
      break;
    }
  }

  if (!inMaze && !showDeadImage && !imageCooldown) {
    showDeadImage = true;
    deadImageStartTime = millis();
  }


  for (let i = 0; i < subtitles.length; i++) {
    let s = subtitles[i];
    if (player.x > width * s.trigger) s.revealed = true;
    if (s.revealed && s.charIndex < s.text.length) s.charIndex += revealSpeed;

    if (s.revealed) {
      let partial = s.text.substring(0, floor(s.charIndex));
      drawSubtitle(partial, s);
    }
  }


  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;

  if (player.x > width - player.r) {
    window.location.href = "page4.html";
  }
}

function drawSubtitle(content, config) {
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = shadowColor.toString();


  fill(fontColor);
  textStyle(ITALIC);
  textFont("Helvetica");
  textSize(35);
  textWrap(WORD);

  let x, align;
  let y = height * config.yOffset;
  let wrapWidth = width * 0.6;

  if (config.xAlign === "left") {
    x = width * config.xOffset;
    align = LEFT;
  } else if (config.xAlign === "center") {
    x = width / 2;
    align = CENTER;
  } else if (config.xAlign === "right") {
    x = width * (1 - config.xOffset);
    align = RIGHT;
  }

  textAlign(align, TOP);
  text(content, x, y, wrapWidth);

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "rgba(0,0,0,0)";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}