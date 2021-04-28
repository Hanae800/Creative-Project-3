class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    
    return false;
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }
  
  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}
var eatSound;
var startOverSound;
var laugh;
var fr = 3;
var musicRate = 1;
var song;
var slider;

let snake;
let rez = 20;
let food;
let w;
let h;

function loaded() {
song.play();
  eatSound = loadSound("Sweet.mp3");
  startOverSound = loadSound("Fail.mp3");
  laugh = loadSound("Laugh.mp3");
}

function setup() {
  createCanvas(600, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  song = loadSound("Backgroundmusic.mp3", loaded);
  slider = createSlider(0,1,1.5,0.01);
  snake = new Snake();
  foodLocation();
    bgColor = color( random(255), random(255), random(255))
  createP ('');
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
    frameRate(fr);
    pickLocation();
    
  }
  
  bgColor = color( random(255), random(255), random(255) );
}

function draw() {
  scale(rez);
  background(bgColor);
  
song.setVolume(slider.value());
  if (snake.eat(food)) {
    eatSound.play();
    fr += 2;
    musicRate += 0.5;
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
  song.stop();
    startOverSound.play();
    laugh.play();
    fr += 2;
    musicRate += 0.5;
    foodLocation();
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  
}
