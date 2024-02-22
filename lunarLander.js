// The game's variables
const initialSpeed = 0.9;
let velocity = initialSpeed;
let acceleration = 1.11;
let deacceleration = 0.55;
let gameState = "start";

let rocket = {
  x: 250, // Initial x position
  y: 217, // Initial y position
  width: 100, // Rocket width
  height: 150, // Rocket height
};
let landed = false;
let crashed = false;
let youWin = false;

function setup() {
  createCanvas(800, 550);
}

function draw() {
  background("#2E1A47");
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "game") {
    drawGameScreen(); // Draw game elements
  } else if (gameState === "result") {
    drawResultScreen();
  }
  drawBlinkingStars();
}

function drawBlinkingStars() {
  // For loop and an array
  for (let i = 0; i < 100; i++) {
    let starsBackground = {
      // The object
      locationX: random(width), //Between 0 and the canvas width
      locationY: random(height),
      size: random(1, 4),
    };
    fill(255);
    noStroke();
    ellipse(
      //inspired by https://medium.com/@cldiegoj/quick-guide-into-creative-coding-with-p5-js-add64d83880f
      starsBackground.locationX,
      starsBackground.locationY,
      starsBackground.size,
      starsBackground.size
    );
  }
}

function drawStartScreen() {
  fill(255);
  rect(159, 332, 200, 50);
  textSize(20);
  fill(0);
  text("Play Game", 255, 354);
  if (
    mouseX >= 159 &&
    mouseX <= 359 &&
    mouseY >= 332 &&
    mouseY <= 382 &&
    mouseIsPressed
  ) {
    gameState = "game";
  }
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("LUNAR LANDER", width / 2, height / 3);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(
    "Control your rocket's movement using the upper key on your keyboard",
    width / 2,
    height / 3 + 35
  );
}

function drawGameScreen() {
  drawMoon();
  push();
  translate(width / 2, 100); // Translate to the center top of the screen
  scale(0.3); // Scale down the drawing
  drawRocket(); // Draw the rocket
  pop();

  rocket.y += velocity;
  if (keyIsDown(UP_ARROW)) {
    velocity *= deacceleration;
  } else {
    velocity *= acceleration;
  }

  //ask in the lap!
  if (rocket.y + rocket.height >= height - 40) {
    if (velocity < 5) {
      gameState = "result";
      youWin = true;
    } else {
      gameState = "result";
      crashed = true;
    }
  }
  drawBlinkingStars(); // Draw blinking stars
}

function drawMoon() {
  noStroke();
  fill(252, 201, 224);
  ellipse(250, 590, 655, 365);
  drawCrater(100, 620, 95, 65, 105, 620, 80, 65);
  drawCrater(10, 580, 65, 25, 20, 580, 45, 25);
  drawCrater(80, 530, 65, 15, 85, 530, 55, 15);
  drawCrater(30, 490, 95, 35, 42, 490, 70, 35);
  drawCrater(115, 445, 45, 35, 118, 445, 40, 35);
}
//inspired by https://editor.p5js.org/lucidprojects/sketches/z-1j6o7f3
function drawCrater(
  outerX,
  outerY,
  outerW,
  outerH,
  innerX,
  innerY,
  innerW,
  innerH
) {
  fill(100, 87, 138);
  ellipse(outerX, outerY, outerW, outerH);
  fill(185, 166, 218);
  ellipse(innerX, innerY, innerW, innerH);
}
//inspired by https://editor.p5js.org/lucidprojects/sketches/z-1j6o7f3
function drawRocket() {
  push();

  // Translate to the rocket's position
  translate(rocket.x, rocket.y);

  // Draw the rocket
  // Lower left wing
  beginShape();
  fill(141, 121, 179);
  vertex(161, 326);
  vertex(102, 421);
  vertex(107, 420);
  vertex(115, 410);
  vertex(135, 385);
  vertex(145, 375);
  vertex(150, 372);
  vertex(169, 368);
  endShape();
  // Lower right wing
  beginShape();
  fill(141, 121, 179);
  vertex(309, 420);
  vertex(314, 421);
  vertex(255, 326);
  vertex(249, 368);
  vertex(256, 370);
  vertex(272, 375);
  vertex(282, 385);
  vertex(300, 410);
  endShape();
  fill(200);
  quad(110, 375, 111, 372, 140, 400, 138, 400);
  quad(312, 374, 310, 372, 280, 400, 282, 400);
  // Rocket ship body straight
  beginShape();
  fill(254, 255, 217);
  vertex(211, 96);
  vertex(189, 141);
  vertex(160, 328);
  vertex(170, 379);
  vertex(247, 380);
  vertex(257, 328);
  vertex(232, 141);
  endShape();
  // Rocket ship body ellipse
  fill(73, 46, 133);
  ellipse(210, 260, 95, 265);
  // Rocketship needle
  fill(200);
  rect(210, 61, 2, 80);
  // Rocket window large
  fill(200);
  ellipse(210, 210, 60, 60);
  // Rocket window sml
  fill(100);
  ellipse(210, 210, 40, 40);

  pop();
}

function drawResultScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  if (youWin) {
    text("You won!", width / 2, height / 2);
  } else if (crashed) {
    text("You lost!", width / 2, height / 2);
  }
}
