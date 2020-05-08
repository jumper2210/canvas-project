import { randomIntFromRange } from "./utils.js";
// basic setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  Y: innerHeight / 2,
};
//variables
let bigCircles = [];
let bcLength = bigCircles.length;
let smallCircles = [];
let bRadius;
let xB;
let yB;
let dx;
let dy;
let xs;
let ys;
let sRadius;
const friction = 0.19;
const gravity = 1;
// addEventListener("mousemove", (event) => {
//   mouse.x = event.clientX;
//   mouse.Y = event.clientY;
//   init();
// });
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  bcLength === 1 ? 0 : init();
});
// Objects
class SmallCircle {
  constructor(x, y, dx, dy, radius, color) {
    this.xs = x;
    this.ys = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.xs, this.ys, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
  update() {
    this.draw();
  }
}

class BigCircle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      bigCircles = [];
      if (bcLength === 0) {
        bigCircles = [];
        for (let i = 0; i < 3; i++) {
          sRadius = 15;
          xs = randomIntFromRange(sRadius, canvas.width - sRadius);
          ys = 93;
          dx = 20;
          dy = 20;
          smallCircles.push(new SmallCircle(xs, ys, dx, dy, sRadius, "red"));
        }
      }
    } else {
      this.dy += gravity * 0.2;
    }
    this.y += this.dy;
    this.draw();
  }
}

const init = () => {
  for (let i = 0; i < 1; i++) {
    bRadius = 85;
    xB = randomIntFromRange(bRadius, canvas.width - bRadius);
    yB = 93;
    dx = randomIntFromRange(-1, 1);
    dy = randomIntFromRange(-2, 2);
    bigCircles.push(new BigCircle(xB, yB, dx, dy, bRadius, "red"));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  bigCircles.forEach((bc) => {
    bc.update();
  });
  smallCircles.forEach((sc) => {
    sc.update();
  });
};
init();
animate();
