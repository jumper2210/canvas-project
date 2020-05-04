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
let bigBalls = [];
let bRadius;
let xB;
let yB;
//
// addEventListener("mousemove", (event) => {
//   mouse.x = event.clientX;
//   mouse.Y = event.clientY;
//   init();
// });
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
// function randomIntFromRange(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
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
    this.draw();
  }
}

const init = () => {
  for (let i = 0; i < 1; i++) {
    bRadius = 100;
    xB = randomIntFromRange(bRadius, canvas.width - bRadius);
    yB = randomIntFromRange(0, canvas.height - bRadius);
    bigBalls.push(new Circle(xB, yB, bRadius, "red"));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  bigBalls.forEach((bb) => {
    bb.update();
  });
};
init();
animate();
