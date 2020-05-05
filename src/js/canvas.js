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
let bRadius;
let xB;
let yB;
let dx;
let dy;
const friction = 0.69;
const gravity = 1;
// addEventListener("mousemove", (event) => {
//   mouse.x = event.clientX;
//   mouse.Y = event.clientY;
//   init();
// });
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  bigCircles.length === 1 ? 0 : init();
});
// Objects
class Circle {
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
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
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
    dx = randomIntFromRange(-2, 2);
    dy = randomIntFromRange(-2, 2);
    bigCircles.push(new Circle(xB, yB, dx, dy, bRadius, "red"));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  bigCircles.forEach((bb) => {
    bb.update();
  });
};
init();
animate();
