import { randomIntFromRange } from "./utils.js";
// basic setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
  x: undefined,
  y: undefined,
};
//variables
const colorOfBc = "#1d3e53";
let bigCircles = [];
let bcLength = bigCircles.length;
let smallCircles = [];
let scLength = smallCircles.length;
let bRadius;
let xB;
let yB;
let dx;
let dy;
let xs;
let ys;
let smallRadius;
const minScRadius = 10;
const maxScRadius = 60;
const friction = 0.19;
const gravity = 1;
let posXToExplode;
let posYToExplode;
let colorArray = ["#476d7c", "#0d7377", "#14ffec"];

addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initSmallCircles();
});
// Objects
class SmallCircle {
  constructor(xs, ys, dx, dy, smallRadius, color) {
    this.xs = xs;
    this.ys = ys;
    this.dx = dx;
    this.dy = dy;
    this.smallRadius = smallRadius;
    this.minScRadius = smallRadius;
    this.color = colorArray[randomIntFromRange(0, colorArray.length)];
  }
  draw() {
    c.beginPath();
    c.arc(this.xs, this.ys, this.smallRadius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  }
  update() {
    if (
      this.xs + this.smallRadius > innerWidth ||
      this.xs - this.smallRadius < 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.ys + this.smallRadius > innerHeight ||
      this.ys - this.smallRadius < 0
    ) {
      this.dy = -this.dy;
    }

    this.xs += this.dx;
    this.ys += this.dy;

    // mouse interactivity
    if (
      mouse.x - this.xs < 50 &&
      mouse.x - this.xs > -50 &&
      mouse.y - this.ys < 50 &&
      mouse.y - this.ys > -50
    ) {
      if (this.smallRadius < maxScRadius) {
        this.smallRadius += 1;
      }
    } else if (this.smallRadius > this.minScRadius) {
      this.smallRadius -= 1;
    }

    this.draw();
  }
}

class BigCircle {
  constructor(x, y, dyB, radius, color) {
    this.x = x;
    this.y = y;
    this.dyB = dyB;
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
    posXToExplode = this.x;
    posYToExplode = this.y;
    if (this.y + this.radius + this.dyB > canvas.height) {
      bigCircles = [];
      if (bcLength == 0 && scLength < 100) {
        initSmallCircles();
      }
    } else {
      this.dyB += gravity * 0.1;
    }
    this.y += this.dyB;
    this.draw();
  }
}

const init = () => {
  for (let i = 0; i < 1; i++) {
    bRadius = 125;
    xB = randomIntFromRange(bRadius, canvas.width - bRadius);
    yB = bRadius;
    dy = 0.1;
    bigCircles.push(new BigCircle(xB, yB, dy, bRadius, colorOfBc));
  }
};
const initSmallCircles = () => {
  smallCircles = [];
  for (let j = 0; j < 300; j++) {
    smallRadius = randomIntFromRange(4, 10);
    xs = randomIntFromRange(
      posXToExplode + smallRadius,
      canvas.width - posXToExplode
    );
    ys = randomIntFromRange(
      posYToExplode + smallRadius,
      canvas.height - posYToExplode
    );
    dx = randomIntFromRange(1, 2);
    dy = randomIntFromRange(1, 2);
    smallCircles.push(new SmallCircle(xs, ys, dx, dy, smallRadius, "red"));
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
