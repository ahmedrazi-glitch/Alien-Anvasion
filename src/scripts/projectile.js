class Projectile {
  constructor(x, y, vx, vy, damage) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.people = [];
  }

  update(dt) {
    // Update the projectile's position based on its velocity and the elapsed time
    // this.x += this.vx * dt;
    // this.y += this.vy * dt;
    this.y += 2;
  }

  draw(ctx) {
    // Draw the projectile as a small circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  checkCollision(person) {
    if (person.x === this.x){
      return 'hello';
    }
  }
}

export default Projectile;