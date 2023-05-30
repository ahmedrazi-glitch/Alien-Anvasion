class Projectile {
  constructor(x, y, vx, vy, damage) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.width = 10; // Set the width of the projectile
    this.height = 10; // Set the height of the projectile
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

  // checkCollision(person) {
  //   if (person.x === this.x){
  //     return 'hello';
  //   }
  // }

  // isOutOfBound() {
  //   return this.x > 475; // Game.DIM_X + this.radius;
  //   console.log("out");
  // }
}

export default Projectile;