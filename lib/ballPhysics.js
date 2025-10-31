const GRAVITY = 0.5;
const BOUNCE_ELASTICITY = 0.7;
const DAMPING = 0.98;
const FRICTION = 0.99;

export class Ball {
  constructor(x, y, radius, color, userId) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
    this.userId = userId;
    this.mass = (radius * radius * Math.PI) / 100;
  }

  update(width, height) {
    // Apply gravity
    this.vy += GRAVITY;

    // Apply friction
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -BOUNCE_ELASTICITY;
    }
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.vx *= -BOUNCE_ELASTICITY;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -BOUNCE_ELASTICITY;
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.vy *= -BOUNCE_ELASTICITY;
      this.vy *= DAMPING;
    }
  }

  draw(ctx) {
    // Draw glow
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color + "40");
    gradient.addColorStop(1, this.color + "00");
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - this.radius * 1.5, this.y - this.radius * 1.5, this.radius * 3, this.radius * 3);

    // Draw ball
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = this.color + "80";
    ctx.beginPath();
    ctx.arc(this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 3, 0, Math.PI * 2);
    ctx.fill();
  }

  collidesWith(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + other.radius;
  }

  resolveCollision(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    const nx = dx / distance;
    const ny = dy / distance;

    const dvx = other.vx - this.vx;
    const dvy = other.vy - this.vy;

    const dvn = dvx * nx + dvy * ny;

    if (dvn >= 0) return;

    const impulse = -dvn / (this.mass + other.mass);

    this.vx -= impulse * this.mass * nx;
    this.vy -= impulse * this.mass * ny;
    other.vx += impulse * other.mass * nx;
    other.vy += impulse * other.mass * ny;

    const overlap = (this.radius + other.radius - distance) / 2;
    this.x -= overlap * nx;
    this.y -= overlap * ny;
    other.x += overlap * nx;
    other.y += overlap * ny;
  }
}

export const updateAllBalls = (balls, width, height) => {
  balls.forEach(ball => ball.update(width, height));

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].collidesWith(balls[j])) {
        balls[i].resolveCollision(balls[j]);
      }
    }
  }
};

export const drawBalls = (ctx, balls, isDarkMode) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  balls.forEach(ball => ball.draw(ctx));
};
