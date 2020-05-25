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
let smallRadius;
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
  constructor(xs, ys, dx, dy, smallRadius, color) {
    this.xs = xs;
    this.ys = ys;
    this.dx = dx;
    this.dy = dy;
    this.smallRadius = smallRadius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.xs, this.ys, this.smallRadius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }
  update() {
    console.log(this.ys, this.dy, "tutaj Y");

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

    this.draw();
  }
}

class BigCircle {
  constructor(x, y, dxB, dyB, radius, color) {
    this.x = x;
    this.y = y;
    this.dxB = dxB;
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
    if (this.y + this.radius + this.dyB > canvas.height) {
      bigCircles = [];
      if (bcLength === 0) {
        bigCircles = [];
        for (let j = 0; j < 3; j++) {
          smallRadius = 15;
          xs = randomIntFromRange(smallRadius, canvas.width - smallRadius);
          ys = 200;
          dx = randomIntFromRange(-1, 1);
          dy = 2;
          smallCircles.push(
            new SmallCircle(xs, ys, dx, dy, smallRadius, "red")
          );
        }
      }
    } else {
      this.dyB += gravity * 0.2;
    }
    this.y += this.dyB;
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
    bigCircles.push(new BigCircle(xB, yB, dx, dy, bRadius, "white"));
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
