// Reference:
// https://editor.p5js.org/MOQN/sketches/3tCEneUsu

let balls = [];
let ballstwo = [];
let ballsthree = [];
let screen = 0;
let maxBalls;
let amt = 50;
let amt2 = 100;
let amt3 = 150;
let speed = 2;
let speed2 = 7;
let speed3 = 10;
let x = 400;
let y = -50;
let dia;
let freq;
let mySound;

function preload(){
mySound = loadSound("wangxian.mp3")  
}

function setup() {
  createCanvas(1000, 900);
  mySound.play()
  createBallArray(amt, speed);
  createBallArrayTwo(amt2, speed2);
  createBallArrayThree(amt3, speed3);

  dia = 30;
  freq = 0;
}

function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameStart();
  } else if (screen == 2) {
    levelTwo();
  } else if (screen == 3) {
    levelThree();
  } else if (screen == 4) {
    endGame();
  }
}

//start
function startScreen() {
  background("#738891");

  fill("#572c12");
  noStroke();
  beginShape();
  vertex(0, 660);
  vertex(300, 680);
  vertex(325, 660);
  vertex(350, 670);
  vertex(400, 655);
  vertex(500, 660);
  vertex(525, 655);
  vertex(850, 650);
  vertex(1000, 665);
  vertex(1000, 1000);
  vertex(0, 1000);
  endShape();

  fill("#401d07");
  noStroke();
  beginShape();
  vertex(0, 610);
  vertex(150, 700);
  vertex(600, 650);
  vertex(750, 675);
  vertex(800, 685);
  vertex(900, 675);
  vertex(1000, 790);
  vertex(1000, 900);
  vertex(0, 900);
  endShape();

  fill("#240f02");
  noStroke();
  beginShape();
  vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
  endShape();

  textAlign(CENTER);
  textFont("Georgia");
  textSize(20);
  fill("#f4f5a9");
  text(
    "t h e   s u n   h a s   d i s a p p e a r e d .",
    width / 2,
    height / 2 - 150
  );
  fill(255);
  text(
    "c o l l e c t   t h e   l i g h t    p a r t i c l e s    t o",
    width / 2,
    height / 2 - 120
  );
  text("c r e a t e   y o u r   o w n   s u n .", width / 2, height / 2 - 90);
  fill("#f4f5a9");
  text("c l i c k    t o    s t a r t   : )", width / 2, height / 2 - 20);
}

//the game
function createBallArray(amount, multiplier) {
  maxBalls = amount;

  for (let i = 0; i < maxBalls; i++) {
    let x = random(width);
    let y = random(height);
    let speedX = random(-1, 1) * multiplier;
    let speedY = 0; //random(-1, 1) * multiplier;
    let radius = random(8, 25);

    let b = new Ball(x, y, speedX, speedY, radius);
    balls.push(b);
  }
}
//level two function
function createBallArrayTwo(amountTwo, multiplierTwo) {
  maxBallsTwo = amountTwo;

  for (let i = 0; i < maxBallsTwo; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let speedX1 = random(-1, 1) * multiplierTwo;
    let speedY1 = 0; //random(-1, 1) * multiplier;
    let radius1 = random(8, 25);

    let c = new BallTwo(x1, y1, speedX1, speedY1, radius1);
    ballstwo.push(c);
  }
}

function createBallArrayThree(amountThree, multiplierThree) {
  maxBallsThree = amountThree;

  for (let i = 0; i < maxBallsThree; i++) {
    let x2 = random(width);
    let y2 = random(height);
    let speedX2 = random(-1, 1) * multiplierThree;
    let speedY2 = 0; //random(-1, 1) * multiplier;
    let radius2 = random(8, 25);

    let d = new BallThree(x2, y2, speedX2, speedY2, radius2);
    ballsthree.push(d);
  }
}

function gameStart() {
  background("#de4b07");

  fill("#536473");
  noStroke();
  beginShape();
  vertex(0, 660);
  vertex(300, 680);
  vertex(325, 660);
  vertex(350, 670);
  vertex(400, 655);
  vertex(500, 660);
  vertex(525, 655);
  vertex(850, 650);
  vertex(1000, 665);
  vertex(1000, 1000);
  vertex(0, 1000);
  endShape();

  fill("#34414d");
  noStroke();
  beginShape();
  vertex(0, 610);
  vertex(150, 700);
  vertex(600, 650);
  vertex(750, 675);
  vertex(800, 685);
  vertex(900, 675);
  vertex(1000, 790);
  vertex(1000, 900);
  vertex(0, 900);
  endShape();

  fill("#293845");
  noStroke();
  beginShape();
  vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
  endShape();

  // ***
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    b.move();
    //b.randomMove();
    b.bounce();
    b.show();
    b.checkMouse();
    if (b.isDone) {
      balls.splice(i, 1);
    }
  }

  if (balls.length == 0) {
    screen = 2;
  }

  fill(255);
  text(balls.length, 20, 30);
}

class Ball {
  constructor(tempX, tempY, tempSpeedX, tempSpeedY, tempRadius) {
    this.x = tempX;
    this.y = tempY;
    this.speedX = tempSpeedX + 1;
    this.speedY = tempSpeedY + 1;
    this.radius = tempRadius;
    this.isDone = false;
  }

  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.radius) {
      // in
      if (mouseIsPressed) {
        // this.isDone = true;
        this.speedX = 0.0001;
        this.speedY = random(-3, -1);
      }
    } else {
      // out
    }

    if (this.speedX == 0.0001 && this.y < 5.1) {
      this.isDone = true;
    }
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  bounce() {
    if (this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;
    }
    if (this.y < 5 || this.y > height) {
      this.speedY = -this.speedY;
    }
    /*
    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }
    */
    if (this.y < 0) {
      this.isDone = true;
    }
  }
  show() {
    push();
    fill(random(200, 255), random(200, 255), random(0, 255), 50);
    circle(this.x, this.y, this.radius * 2);
    circle(this.x, this.y, this.radius * 1.4);
    fill(random(200, 255), random(200, 255), random(0, 255));
    circle(this.x, this.y, this.radius * 0.5);
    pop();
  }
}

//level 2

function levelTwo() {
  background("#F1763D");

  fill("#536473");
  noStroke();
  beginShape();
  vertex(0, 660);
  vertex(300, 680);
  vertex(325, 660);
  vertex(350, 670);
  vertex(400, 655);
  vertex(500, 660);
  vertex(525, 655);
  vertex(850, 650);
  vertex(1000, 665);
  vertex(1000, 1000);
  vertex(0, 1000);
  endShape();

  fill("#34414d");
  noStroke();
  beginShape();
  vertex(0, 610);
  vertex(150, 700);
  vertex(600, 650);
  vertex(750, 675);
  vertex(800, 685);
  vertex(900, 675);
  vertex(1000, 790);
  vertex(1000, 900);
  vertex(0, 900);
  endShape();

  fill("#293845");
  noStroke();
  beginShape();
  vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
  endShape();

  // ***
  for (let i = ballstwo.length - 1; i >= 0; i--) {
    let c = ballstwo[i];
    c.shift();
    //b.randomMove();
    c.rebound();
    c.display();
    c.check();
    if (c.isDone) {
      ballstwo.splice(i, 1);
    }
  }

  if (ballstwo.length == 0) {
    screen = 3;
  }

  fill(255);
  text(ballstwo.length, 20, 30);
}

class BallTwo {
  constructor(tempX1, tempY1, tempSpeedX1, tempSpeedY1, tempRadius1) {
    this.x1 = tempX1;
    this.y1 = tempY1;
    this.speedX1 = tempSpeedX1 + 1;
    this.speedY1 = tempSpeedY1 + 1;
    this.radius1 = tempRadius1;
    this.isDone = false;
  }

  check() {
    let distance = dist(this.x1, this.y1, mouseX, mouseY);
    if (distance < this.radius1) {
      // in
      if (mouseIsPressed) {
        // this.isDone = true;
        this.speedX1 = 0.0001;
        this.speedY1 = random(-3, -1);
      }
    } else {
      // out
    }

    if (this.speedX1 == 0.0001 && this.y1 < 5.1) {
      this.isDone = true;
    }
  }
  shift() {
    this.x1 += this.speedX1;
    this.y1 += this.speedY1;
  }
  rebound() {
    if (this.x1 < 0 || this.x1 > width) {
      this.speedX1 = -this.speedX1;
    }
    if (this.y1 < 5 || this.y1 > height) {
      this.speedY1 = -this.speedY1;
    }
    /*
    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }
    */
    if (this.y1 < 0) {
      this.isDone = true;
    }
  }
  display() {
    push();
    fill(random(200, 255), random(200, 255), random(0, 255), 50);
    circle(this.x1, this.y1, this.radius1 * 2);
    circle(this.x1, this.y1, this.radius1 * 1.1);
    fill(random(200, 255), random(200, 255), random(0, 255));
    circle(this.x1, this.y1, this.radius1 * 0.5);
    pop();
  }
}

function levelThree() {
  background("#E67297");

  fill("#536473");
  noStroke();
  beginShape();
  vertex(0, 660);
  vertex(300, 680);
  vertex(325, 660);
  vertex(350, 670);
  vertex(400, 655);
  vertex(500, 660);
  vertex(525, 655);
  vertex(850, 650);
  vertex(1000, 665);
  vertex(1000, 1000);
  vertex(0, 1000);
  endShape();

  fill("#34414d");
  noStroke();
  beginShape();
  vertex(0, 610);
  vertex(150, 700);
  vertex(600, 650);
  vertex(750, 675);
  vertex(800, 685);
  vertex(900, 675);
  vertex(1000, 790);
  vertex(1000, 900);
  vertex(0, 900);
  endShape();

  fill("#293845");
  noStroke();
  beginShape();
  vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
  endShape();

  // ***
  for (let i = ballsthree.length - 1; i >= 0; i--) {
    let d = ballsthree[i];
    d.shift();
    //b.randomMove();
    d.rebound();
    d.display();
    d.check();
    if (d.isDone) {
      ballsthree.splice(i, 1);
    }
  }

  if (ballsthree.length == 0) {
    screen = 4;
  }

  fill(255);
  text(ballsthree.length, 20, 30);
}

class BallThree {
  constructor(tempX2, tempY2, tempSpeedX2, tempSpeedY2, tempRadius2) {
    this.x2 = tempX2;
    this.y2 = tempY2;
    this.speedX2 = tempSpeedX2 + 1;
    this.speedY2 = tempSpeedY2 + 1;
    this.radius2 = tempRadius2;
    this.isDone = false;
  }

  check() {
    let distance = dist(this.x2, this.y2, mouseX, mouseY);
    if (distance < this.radius2) {
      // in
      if (mouseIsPressed) {
        // this.isDone = true;
        this.speedX2 = 0.0001;
        this.speedY2 = random(-3, -1);
      }
    } else {
      // out
    }

    if (this.speedX2 == 0.0001 && this.y2 < 5.1) {
      this.isDone = true;
    }
  }
  shift() {
    this.x2 += this.speedX2;
    this.y2 += this.speedY2;
  }
  rebound() {
    if (this.x2 < 0 || this.x2 > width) {
      this.speedX2 = -this.speedX2;
    }
    if (this.y2 < 5 || this.y2 > height) {
      this.speedY2 = -this.speedY2;
    }
    /*
    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }
    */
    if (this.y2 < 0) {
      this.isDone = true;
    }
  }
  display() {
    push();
    fill(random(200, 255), random(200, 255), random(0, 255), 50);
    circle(this.x2, this.y2, this.radius2 * 2);
    circle(this.x2, this.y2, this.radius2 * 1.1);
    fill(random(200, 255), random(200, 255), random(0, 255));
    circle(this.x2, this.y2, this.radius2 * 0.5);
    pop();
  }
}

//end
function endGame() {
  background("#2f3252");

  fill("#AA76D7");
  noStroke();
  beginShape();
  vertex(0, 660);
  vertex(300, 680);
  vertex(325, 660);
  vertex(350, 670);
  vertex(400, 655);
  vertex(500, 660);
  vertex(525, 655);
  vertex(850, 650);
  vertex(1000, 665);
  vertex(1000, 1000);
  vertex(0, 1000);
  endShape();

  fill("#60328A");
  noStroke();
  beginShape();
  vertex(0, 610);
  vertex(150, 700);
  vertex(600, 650);
  vertex(750, 675);
  vertex(800, 685);
  vertex(900, 675);
  vertex(1000, 790);
  vertex(1000, 900);
  vertex(0, 900);
  endShape();

  fill("#4c0e82");
  noStroke();
  beginShape();
  vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
  endShape();

  fill(250);
  textAlign(CENTER);
  textSize(20);
  text(
    "c o n g r a t u l a t i o n s ! !   t h e   s u n   i s   b a c k !",
    width / 2,
    height / 2 - 50
  );
  text("c l i c k   t o   p l a y   a g a i n", width / 2, height / 2 - 10);

  if (y > 80) {
    background("#80939c");
    fill("#c989bd");
    noStroke();
    beginShape();
    vertex(0, 660);
    vertex(300, 680);
    vertex(325, 660);
    vertex(350, 670);
    vertex(400, 655);
    vertex(500, 660);
    vertex(525, 655);
    vertex(850, 650);
    vertex(1000, 665);
    vertex(1000, 1000);
    vertex(0, 1000);
    endShape();

    fill("#a8659b");
    noStroke();
   beginShape();
   vertex(0, 610);
   vertex(150, 700);
   vertex(600, 650);
   vertex(750, 675);
   vertex(800, 685);
   vertex(900, 675);
   vertex(1000, 790);
   vertex(1000, 900);
   vertex(0, 900);
    endShape();

    fill("#854277");
    noStroke();
    beginShape();
    vertex(0, 1000);
  vertex(0,780)
  vertex(100, 690);
  vertex(150,790)
  vertex(200, 720);
  vertex(320, 715);
  vertex(455, 620);
  vertex(695, 800);
  vertex(1000, 840);
  vertex(1000, 750);
  vertex(1000, 900);
    endShape();
    fill("#071c02");
    textAlign(CENTER);
    textSize(20);
    text(
      "e n d   g a m e! !   t h e   s u n   i s   b a c k !",
      width / 2,
      height / 2 - 50
    );
    text("c l i c k   t o   p l a y   a g a i n", width / 2, height / 2 - 10);
  }

  let diam = 100 + sin(freq) * dia;
  freq += 0.01;
  y += 1;
  y = constrain(y, 0, 100);
  fill(255, 243, 181, 50);
  ellipse(x, y, diam, diam);
  fill(245, 220, 91, 150);
  ellipse(x, y, diam - 20, diam - 20);
}
//if (balls.length == 0) {screen = 2;}
function mousePressed() {
  if (screen == 0) {
    screen = 1;
  } else if (screen == 1 && balls.length == 0) {
    screen = 2;
  } else if (screen == 2 && ballstwo.length == 0) {
    screen = 3;
  } else if (screen == 3 && ballsthree.length == 0) {
    screen = 4;
  } else if (screen == 4) {
    screen = 0;
    createBallArray(amt, speed); // ***
    createBallArrayTwo(amt2, speed2);
    createBallArrayThree(amt3, speed3);
  }
}
