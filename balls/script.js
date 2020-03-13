const area = document.querySelector('#play-area');
const res = document.querySelector('.btn__reset');
const ctx = area.getContext('2d');
let ballsArr = [];
let i = 0;

class Ball {
  constructor(coordX, coordY) {
    this.x = coordX;
    this.y = coordY;
    this.radius = Math.random() * (50 - 20) + 20;
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
      case 3:
        break;
      default:
        break;
    }
  }

  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fe2e00';
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > area.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > area.width || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < ballsArr.length; i++) {
      ballsArr[i].create();
      ballsArr[i].update();
    }
    requestAnimationFrame(() => this.animate());
  }
}

area.addEventListener('click', event => {
  let newBall = new Ball(event.clientX, event.clientY);
  ballsArr.push(newBall);
  newBall.create();
  newBall.animate();
  i++;
});

res.addEventListener('click', () => {
  location.reload();
});
