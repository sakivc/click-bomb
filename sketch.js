const NUM = 50;
var balls = [];
const FRAMES = 60;

function setup() {
  createCanvas(800, 800);
  let i = 0;
  while (i < NUM) {
    balls.push(new Ball());
    i++;
  }
}

function draw() {
  background(51);
  
  let target = createVector(mouseX,mouseY);
  
  push();
  noStroke();
  fill(52);
  ellipse(target.x,target.y,400);
  fill(60);
  ellipse(target.x,target.y,100);  
  pop();
  
  let i = 0;
  while ( i < FRAMES){
    for (let ball_a of balls){
      for (let ball_b of balls){
        if(ball_a != ball_b){
          ball_a.force_rep(ball_b.pos);
        }
      }
      ball_a.force_att(target);
      ball_a.update();
    }
    i++;
  }
  for (let ball of balls){
    ball.show();
  }
}

class Ball{
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.dia = 10;
    this.fri = 0.2;
  }
  force_att(tar){
    let d = dist(this.pos.x,this.pos.y,tar.x,tar.y);
    if (d > 50 && d<200){
      let move = createVector(tar.x-this.pos.x,tar.y-this.pos.y);
      move.setMag(1);
      this.acc.add(move);
    }
    if (d < 50){
      let move = createVector(tar.x-this.pos.x,tar.y-this.pos.y);
      move.setMag(-2);
      this.acc.add(move);
    }
  }
  force_rep(tar){
    let d = dist(this.pos.x,this.pos.y,tar.x,tar.y);
    if (d < this.dia*1.5){
      let move = createVector(tar.x-this.pos.x,tar.y-this.pos.y);
      move.setMag(-5);
      this.acc.add(move);
    }
  }
  force_click(tar){
    let d = dist(this.pos.x,this.pos.y,tar.x,tar.y);
    if (d < 70){
      let move = createVector(tar.x-this.pos.x,tar.y-this.pos.y);
      move.setMag(-700);
      this.acc.mult(0);
      this.acc.add(move); 
    }
  }
  update(tar){
    this.vel.add(this.acc);
    this.vel.mult(this.fri);
    this.pos.add(this.vel);
    if (this.vel.mag()<0.1){this.vel.mult(0);}
    this.acc.mult(0);
  }
  show(){
    push();
    stroke(255);
    noFill();
    let x = this.pos.x;
    let y = this.pos.y;
    let d = this.dia;
    ellipse(x,y,d);
    pop();
  }
  
}

function mouseClicked() {
  let target = createVector(mouseX,mouseY);
  for (let ball of balls){
    ball.force_click(target);
  }
  for (let ball of balls){
    ball.update();
  }
}
