import Background from "./background";
import People from "./people";
// import HandleControls from "./handleControls";
import Projectile from "./projectile";


class Game {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.background = new Background(canvas.width, canvas.height);
    // this.background.src = "assets/game/background3.webp";
    this.spaceship = new Image();
    this.spaceship.src = "assets/game/spaceship.png";
    // this.people = new People(canvas.width, canvas.height);
    // this.person0 = new Image();
    // this.person0.src = "assets/game/person0.png";
    // this.person1 = new Image();
    // this.person1.src = "assets/game/person1.png";
    this.firstGame = true;
    this.people = [];
    this.x = 1180;
    this.y = 475;
    this.projectiles = [];
    this.handlePeople();
    this.gameover = false;
    // const input = new HandleControls();
  }

  static DIM_X = 1200;
  static DIM_Y = 600;

  // const input = new HandleControls();

  handlePeople(){
    let startPos = 2280;
    for(let i = 1; i < 6; i += 1){
      let person = new People(`assets/game/person${i}.png`, startPos);
      this.people.push(person);
      startPos += 300;
    }
  }

  handleClick(){  
    window.addEventListener('keydown', e => {
      console.log(e);
      if (e.key === " " && this.projectiles.length <= 5){
        let newProjectile = new Projectile(150, 175, 500, 0, 10);
        this.projectiles.push(newProjectile);
      }
    });
    console.log(this.projectiles);
  }
  

  animate() {
    this.x -= 3;
   
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); 
    this.background.update();
    this.background.draw(this.ctx); // draw the background instance
    this.ctx.drawImage(this.spaceship, 100, 100, 100, 100); // draw the spaceship instace
    // this.ctx.drawImage(this.person0, this.x, this.y, 50, 40);
    this.people.forEach(person => {  // will draw each person after some distance, in the line. 
      person.update(); 
      person.draw(this.ctx); 
    });

    this.projectiles.forEach(projec => {
      projec.update(2);
      projec.draw(this.ctx);
    });

    this.detectCollision();

    this.ctx.beginPath();
    this.ctx.ellipse(150, 500, 35, 65, 30, 60, 45, 15, Math.PI * 2);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.fill();
  
    requestAnimationFrame(this.animate.bind(this));
  }


  detectCollision() {
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
  
      for (let j = 0; j < this.people.length; j++) {
        const person = this.people[j];
  
        // Get the bounding box of the projectile
        const projectileLeft = projectile.x;
        const projectileRight = projectile.x + projectile.width;
        const projectileTop = projectile.y;
        const projectileBottom = projectile.y + projectile.height;
  
        // Get the bounding box of the person
        const personLeft = person.x;
        const personRight = person.x + person.width;
        const personTop = person.y;
        const personBottom = person.y + person.height;
  
        // Check for collision by comparing the bounding boxes
        if (
          projectileLeft < personRight &&
          projectileRight > personLeft &&
          projectileTop < personBottom &&
          projectileBottom > personTop
        ) {
          // Collision detected
          person.isExploded = true;
          console.log("Projectile collided with person");
          // Handle collision logic here
  
          // Remove the projectile from the array
          this.projectiles.splice(i, 1);
          i--; // Decrement the loop counter to account for the removed projectile
  
          // Remove the person from the array
          this.people.splice(j, 1);
          j--; // Decrement the loop counter to account for the removed person
        }
      }
    }
  }

  // detectCollision() {
  //   for (let j = 0; j < this.people.length; j++) {
  //     for (let i = 0; i < this.projectiles.length; i++) {
  //       const singleProjectile = this.projectiles[i];
  //       const singlePerson = this.people[j];
        
  //       // Get the bounding box of the projectile
  //       const projectileLeft = singleProjectile.x;
  //       const projectileRight = singleProjectile.x + singleProjectile.width;
  //       const projectileTop = singleProjectile.y;
  //       const projectileBottom = singleProjectile.y + singleProjectile.height;
  
  //       // Get the bounding box of the person
  //       const personLeft = singlePerson.x;
  //       const personRight = singlePerson.x + singlePerson.width;
  //       const personTop = singlePerson.y;
  //       const personBottom = singlePerson.y + singlePerson.height;
  
  //       // Check for collision by comparing the bounding boxes
  //       if (
  //         projectileLeft < personRight &&
  //         projectileRight > personLeft &&
  //         projectileTop < personBottom &&
  //         projectileBottom > personTop
  //       ) {
  //         // Collision detected
  //         console.log("collided");
  //       } else {
  //         // No collision detected
  //         console.log("did not collide");
  //       }
  //     }
  //   }
  // }

  // detectCollision() {
  //   for (let j = 0; j < this.people.length; j++) {
  //     for (let i = 0; i < this.projectiles.length; i++) {
  //       const singleProjectile = this.projectiles[i];
  //       const singlePerson = this.people[j];
  //       // Get the center coordinates of the projectile
  //       const projectileX = singleProjectile.x; 
  //       const projectileY = singleProjectile.y;
      
  //       // Get the coordinates of the person's bounding box
  //       const personX = singlePerson.x;
  //       const personY = singlePerson.y;
  //       const personWidth = singlePerson.width;
  //       const personHeight = singlePerson.height;
      
  //       // Check for collision by comparing the coordinates
  //       if (
  //         projectileX > personX &&
  //         projectileX < personX + personWidth &&
  //         projectileY > personY &&
  //         projectileY < personY + personHeight
  //       ) {
  //         // Collision detected
  //         console.log("collided");
  //       } else {
  //         // No collision detected
  //         console.log("did not collide");
  //       }
  //     }
  //   }
  // }

  draw() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // this next line of code will draw the background of the game.
    this.ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);
    // this will draw the ufo in the upperleft corner of the canvas.
    this.ctx.filter = "blur(50px)";
    this.ctx.drawImage(this.spaceship, 100, 100, 100, 100);
    // this should draw a human on the canvas
    // this.ctx.drawImage(this.human, this.x, this.y, 50, 40);
    this.background.update();
  }

  start(){
    if(this.firstGame) { 
      // this.intervalId = setInterval(this.draw.bind(this, this.ctx), 100);
      this.handleClick();
      this.animate();
      this.firstGame = false;
    } else {
      clearInterval(this.intervalId);
      this.restartGame();
    }
  }

  restartGame() {
    // Define restart logic here.
    // this.endScreen.style.display = "none";
    // clearInterval(this.intervalId);
    // this.intervalId = setInterval(this.bind(ctx), 100);
    // this.intervalId = setInterval(this.bind(this), 100);
  }
  
}

export default Game;

