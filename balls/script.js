const area = document.querySelector('#play-area');
const res = document.querySelector('.btn__reset');
const cl_area = document.querySelector('.click_area');
const ctx = area.getContext('2d');
let ballsArr = [];
let myReq;
const collors = ['#fe2e00', '#0bfe1f', '#fef909', '#080afe'];
let i = 0;
let start = false;

class Ball {
  constructor(coordX, coordY) {
    this.x = coordX;
    this.y = coordY;
    this.radius = Math.random() * (50 - 20) + 20;
    this.defColor = '#fe2e00';
    this.weight = Math.ceil(
      ((2700 * 4) / 3) * Math.PI * Math.pow(this.radius / 100, 3)
    );
    this.speedX =
      this.radius > 55
        ? Math.ceil(this.radius / 30)
        : Math.ceil(this.radius / 10);
    this.speedY = this.speedX;
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        this.speedX = -this.speedX;
        break;
      case 1:
        this.speedY = -this.speedY;
        break;
      case 2:
        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
        break;
      default:
        break;
    }
  }

  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.defColor;
    ctx.fill();
  }

  colorRand() {
    return collors[Math.floor(Math.random() * collors.length)];
  }

  update() {
    if (this.x + this.radius > area.width || this.x - this.radius < 0) {
      this.defColor = this.colorRand();
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > area.width || this.y - this.radius < 0) {
      this.defColor = this.colorRand();
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  collisionDetect() {
    for (var j = 0; j < ballsArr.length; j++) {
      if (!(this === ballsArr[j])) {
        var dx = this.x - ballsArr[j].x;
        var dy = this.y - ballsArr[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + ballsArr[j].radius) {
          this.speedX = -this.speedX;
          this.speedY = -this.speedY;
        }
      }
    }
  }

  animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < ballsArr.length; i++) {
      ballsArr[i].create();
      ballsArr[i].update();
      ballsArr[i].collisionDetect();
    }
    myReq = requestAnimationFrame(() => this.animate());
  }
}

cl_area.addEventListener('click', event => {
  let newBall = new Ball(event.clientX, event.clientY);
  newBall.defColor = newBall.colorRand();
  ballsArr.push(newBall);
  newBall.create();
  if (start == false) {
    newBall.animate();
    start = true;
  }
});

res.addEventListener('click', () => {
  cancelAnimationFrame(myReq);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ballsArr = [];
  start = false;
});
