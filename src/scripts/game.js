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
    this.a = 1180;
    this.b = 475;
    this.projectiles = [];
    this.handlePeople();
    // const input = new HandleControls();
  }

  static DIM_X = 1200;
  static DIM_Y = 600;

  // const input = new HandleControls();

  handlePeople(){
    let startPos = 1180;
    for(let i = 1; i < 6; i += 1){
      let person = new People(`assets/game/person${i}.png`, startPos);
      this.people.push(person);
      startPos += 300;
    }
  }

  handleClick(){  
    window.addEventListener('keydown', e => {
      console.log(e);
      if (e.key === " "){
        let newProjectile = new Projectile(150, 175, 500, 0, 10);
        this.projectiles.push(newProjectile);
      }
    });
    console.log(this.projectiles);
  }
  
  // animate() {
  //   this.x -= 1;  
 
  //   this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); 
  //   this.ctx.drawImage(this.background, 0, 0, Game.DIM_X, Game.DIM_Y); 
  //   this.background.update();
  //   this.ctx.drawImage(this.spaceship, 100, 100, 100, 100); 
  //   this.ctx.drawImage(this.human, this.x, this.y, 50, 40); 

  //   requestAnimationFrame(this.animate.bind(this));

  // }

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

    for (let i = 0; i < this.projectiles.length; i++) {
      for (let j = 0; j < this.people.length; j++) {
        const singleProjectile = this.projectiles[i];
        const singlePerson = this.people[j];
        const dx = singleProjectile.x - singlePerson.x;
        const dy = singleProjectile.y - singlePerson.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < singleProjectile.width/2 + singlePerson.width/2){
          gameover = true;
          console.log('gameOver');
        }
        // if (singleProjectile.checkCollision(singlePerson) === true ) {
        //   console.log(true);
        //   // Handle collision here
        //   // For example, remove the projectile and person from their arrays
        //   this.projectiles.splice(i, 1);
        //   this.people.splice(j, 1);
        // } else if (singleProjectile.checkCollision(singlePerson) === false) {
        //   console.log(false);
        // }
      }
    }

    this.ctx.beginPath();
    this.ctx.ellipse(150, 500, 35, 65, 30, 60, 45, 15, Math.PI * 2);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.fill();
  
    requestAnimationFrame(this.animate.bind(this));
  }

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

export default Game

// class Game {
//   constructor(canvas) {
//     this.ctx = canvas.getContext("2d");
//     this.background = new Image();
//     this.background.src = "assets/game/background3.webp";
//     this.spaceship = new Image();
//     this.spaceship.src = "assets/game/spaceship.png";
//     this.human = new Image();
//     this.human.src = "assets/game/human.png";
//     this.firstGame = true;
//     this.x = 1180;
//     this.y = 500;
//   }

//   static DIM_X = 1200;
//   static DIM_Y = 600;

//   animate() {
//     // Move human image from right to left
//     this.x -= 1;

//     // Clear canvas and draw images
//     this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//     this.ctx.drawImage(this.background, 0, 0, Game.DIM_X, Game.DIM_Y);
//     this.ctx.drawImage(this.spaceship, 100, 100, 100, 100);
//     this.ctx.drawImage(this.human, this.x, this.y, 50, 40);

//     // Call animate() recursively to create an animation loop
//     requestAnimationFrame(this.animate.bind(this));
//   }

//   draw() {
//     this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//     this.ctx.drawImage(this.background, 0, 0, Game.DIM_X, Game.DIM_Y);
//     this.ctx.drawImage(this.spaceship, 100, 100, 100, 100);
//     this.ctx.drawImage(this.human, this.x, this.y, 50, 40);
//   }

//   start() {
//     if (this.firstGame) {
//       this.animate();
//       this.firstGame = false;
//     } else {
//       clearInterval(this.intervalId);
//       this.restartGame();
//     }
//   }

//   restartGame() {
//     // Define restart logic here.
//   }
// }

// export default Game;