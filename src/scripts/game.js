import Background from "./background";
import People from "./people";
import Projectile from "./projectile";
import Explosion from "./explosion";

class Game {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    
    this.background = new Background(canvas.width, canvas.height);
    this.spaceship = new Image();
    this.spaceship.src = "assets/game/spaceship/spaceship.png";
    this.firstGame = true;
    this.people = [];
    this.x = 1180;
    this.y = 475;
    this.projectiles = [];
    this.explosions = [];
    this.handlePeople();
    this.gameover = false;
    this.gameWon = false;
    this.gameLost = false;
    this.hits = 0;
    this.requestAnimation = null;
    // requestAnimationFrame(this.animate.bind(this));
  }

  static DIM_X = 1200;
  static DIM_Y = 600;

  // const input = new HandleControls();

  handlePeople(){
    let ctx = this.ctx;
    let startPos = 2280;
    for(let i = 1; i < 6; i += 1){
      let person = new People(`assets/game//people/person${i}.png`, startPos, ctx);
      this.people.push(person);
      startPos += 300;
    }
  }

  handleExplosions() {
    let ctx = this.ctx;
    for (let i = 0; i < this.people.length; i ++) {
      let explosion = new Explosion(ctx);
      this.explosions.push(explosion);
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
  }

  animate() {  
    this.x -= 3;
   
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); 
    this.background.update();
    this.background.draw(this.ctx); // draw the background instance
    this.ctx.drawImage(this.spaceship, 100, 100, 100, 100); // draw the spaceship instace
    // this.ctx.drawImage(this.person0, this.x, this.y, 50, 40);

    this.detectCollision(); 


    this.people.forEach(person => {  // will draw each person after some distance, in a line. 
      person.update(); 
      person.draw(this.ctx); 
      
      
      // if (true) {
      //   // this.explosions.forEach(explosion => {
      //     let explosion = new Explosion(this.ctx);
      //     explosion.personExploding(person.x, person.y, person.width, person.height);
      //   // });
      // }
    });
    // console.log(this.people.length);
    // console.log(this.explosions.length);

    // for (let i = 0; i < this.people.length; i++) {
    //   const person = this.people[i];
    //   const explosion = this.explosions[i];
  
    //   person.update();
    //   person.draw(this.ctx);
  
    //   if (this.detectCollision()) {
    //     explosion.personExploding(person.x, person.y, person.width, person.height);
    //   }
    // }

    this.projectiles.forEach(projec => {
      projec.update(2);
      projec.draw(this.ctx);
    });

    
      // is like handleClick() above and will create instances of explosions and put them in the explosions array. ANd remove people from the people array. 

    // creates an explosion instance and puts it in the explosion array and removes person from the person array if there is a collision. 

    // this.explosions.forEach(explosion => {
    //   explosion.personExploding(person.x, person.y, person.width, person.height);
    // });

    // functuon taht interates through explosin arr and updates them draws rhem ...
    // just like projectiles this is a function tha iterates through explosions array and updates them and draws them. 

    if ((!this.gameWon && !this.gameLost) && this.restartGame) {
      this.ctx.beginPath();
      this.ctx.ellipse(150, 500, 35, 65, 30, 60, 45, 15, Math.PI * 2);
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.fill();
    }

    // Scoring logic
    const score = this.hits;
    this.ctx.fillStyle = "Black";
    this.ctx.font = "bold 24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score: " + score, Game.DIM_X / 2, 40);
  
    this.requestAnimation = requestAnimationFrame(this.animate.bind(this));
     
  }

  detectCollision() {
    let collisionDetected = false; // Flag to track if collision occurred
    let minPersonX = Infinity; // Initialize the minimum x-coordinate to a large value
  
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      let hitDetected = false; // Flag to track if a hit occurred for the projectile
  
      for (let j = 0; j < this.people.length; j++) {
        const person = this.people[j]; // instance of collisoon let explosion = new Explosion(ctx); 
        //explosion.personExploding(perople[j];
        // let explosion = new Explosion(this.ctx);
        // explosion.personExploding(person.x, person.y, person.width, person.height);

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

        // Draw a white box around the bounding box
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "white";
        this.ctx.rect(personLeft, personTop, person.width, person.height);
        this.ctx.stroke();
  
        // Check for collision by comparing the bounding boxes
        if (
          projectileLeft < personRight &&
          projectileRight > personLeft &&
          projectileTop < personBottom &&
          projectileBottom > personTop
        ) {
          // Collision detected
          console.log("Projectile collided with person");
          this.hits += 100;
          this.handleExplosions();
          // let explosion = new Explosion(person.ctx);
          // explosion.personExploding(person.x, person.y, person.width, person.height);
          // console.log(person);
          // console.log(this.ctx);
          // console.log(explosion);
          // console.log(explosion.personExploding(person.x, person.y, person.width, person.height));
  
          // Handle collision logic here 
  
          // Remove the projectile from the array 
          this.projectiles.splice(i, 1);
          i--; // Decrement the loop counter to account for the removed projectile  
          
          // Before you remove the person, you will take the x, y, width, height of the person and then delete the person from the array.
          // let expoX = person.x;
          // let width = person.width;
          // let height = person.height;
          let explosion = new Explosion(this.ctx, person.x);
          console.log(person);
          console.log(person.x);
          console.log(person.y);
          console.log(person.width);
          console.log(person.height);
          explosion.personExploding(person.x, person.y, person.width, person.height);


          // Remove the person from the array
          this.people.splice(j, 1);
          j--; // Decrement the loop counter to account for the removed person
          
  
          collisionDetected = true; // Set collision flag to true
          hitDetected = true; // Set hit flag to true
          break; // Break out of the inner loop
        }
      }

      // Update the minimum x-coordinate value
      if (this.people.length > 0 && minPersonX > this.people[this.people.length - 1].x) {
        minPersonX = this.people[this.people.length - 1].x;
      }

      // Break out of the outer loop if collision occurred
      if (collisionDetected) {
        break;
      }
    }
  
    // Check if all people have been eliminated
    if (this.people.length === 0) {
      this.renderWinScreen();
      // Additional logic or actions can be added here if needed
    }

    if (this.hits < 500 && minPersonX <= 0) {
      // this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.renderLoseScreen();
      // Additional logic or actions can be added here if needed
    }
  }

  draw() { // this entire function is uselss !!
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y); // this line of code is useless !!
    // this next line of code will draw the background of the game.
    this.ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y); // this line of code seems useless !!
    // this will draw the ufo in the upperleft corner of the canvas.
    this.ctx.filter = "blur(50px)"; // this line of code is useless !!
    this.ctx.drawImage(this.spaceship, 100, 100, 100, 100); // this line of code is also useless !!
    // this should draw a human on the canvas
    // this.ctx.drawImage(this.human, this.x, this.y, 50, 40);
    this.background.update(); // this line of code is useless !! 
  }

  // start(){
  //   if(this.firstGame) { 
  //     // this.intervalId = setInterval(this.draw.bind(this, this.ctx), 100);
  //     this.handleClick();
  //     this.animate();
  //     this.firstGame = false;
  //   } else {
  //     clearInterval(this.intervalId);
  //     this.restartGame();
  //   }
  // }

  start() {
    if (this.firstGame) {
      this.firstGame = false;
      this.handleClick();
      this.animate();
    } else {
      // Clear the canvas
      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  
      // Reset the game state to its initial values
      this.x = 1180;
      this.y = 475;
      this.projectiles = [];
      this.people = [];
      this.explosions = [];
      this.handlePeople();
      this.gameover = false;
  
      // Start the game again
      // this.animate();
      requestAnimationFrame(this.animate.bind(this), 1000);
    }
  }

  renderWinScreen() {
    this.gameWon = true;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    // Render the dark transparent background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  
    // Render the "You Won!" text
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 48px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("You Won!", Game.DIM_X / 2, Game.DIM_Y / 2 - 50);
  
    // Render the "Play Again" button
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      Game.DIM_X / 2 - 100,
      Game.DIM_Y / 2,
      200,
      50
    );
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Play Again", Game.DIM_X / 2, Game.DIM_Y / 2 + 30);
  
    // Render the "Back To Home" button
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      Game.DIM_X / 2 - 100,
      Game.DIM_Y / 2 + 70,
      200,
      50
    );

    // Add a class or id to the button
    document.querySelector("canvas").setAttribute("class", "home-button"); // Add a class
    // this.ctx.canvas.querySelector("canvas").setAttribute("id", "home-button"); // Add an id

    this.ctx.fillStyle = "white"; 
    this.ctx.font = "bold 24px Arial"; 
    this.ctx.textAlign = "center"; 
    this.ctx.fillText("Back To Home", Game.DIM_X / 2, Game.DIM_Y / 2 + 100); 
   
    // Add event listeners for button functionality
    const canvas = this.ctx.canvas;
  
    // Function to handle mouse move event
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      // Check if mouse is hovering over the "Play Again" button
      if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 &&
        mouseY <= Game.DIM_Y / 2 + 50
      ) {
        canvas.style.cursor = "pointer"; // Change cursor style to pointer
      }
      // Check if mouse is hovering over the "Back To Home" button
      else if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 + 70 &&
        mouseY <= Game.DIM_Y / 2 + 120
      ) {
        canvas.style.cursor = "pointer"; // Change cursor style to pointer
      } else {
        canvas.style.cursor = "default"; // Set default cursor style
      }
    };
  
    // Function to handle mouse click event
    const handleMouseClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      // Check if "Play Again" button is clicked
      if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 &&
        mouseY <= Game.DIM_Y / 2 + 50
      ) {
        this.restartGame(); // Restart the game
      }
      // Check if "Back To Home" button is clicked
      else if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 + 70 &&
        mouseY <= Game.DIM_Y / 2 + 120
      ) {
        window.location.href = "index.html"; // Redirect to the home page
      }
    };
  
    // Add event listeners to canvas
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);
  }

  renderLoseScreen() {
    this.gameLost = true;
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    // Render the dark transparent background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  
    // Render the "You Won!" text
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 48px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("You Lost!", Game.DIM_X / 2, Game.DIM_Y / 2 - 50);
  
    // Render the "Play Again" button
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      Game.DIM_X / 2 - 100,
      Game.DIM_Y / 2,
      200,
      50
    );
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Play Again", Game.DIM_X / 2, Game.DIM_Y / 2 + 30);
  
    // Render the "Back To Home" button
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      Game.DIM_X / 2 - 100,
      Game.DIM_Y / 2 + 70,
      200,
      50
    );
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Back To Home", Game.DIM_X / 2, Game.DIM_Y / 2 + 100);
  
    // Add event listeners for button functionality
    const canvas = this.ctx.canvas;
  
    // Function to handle mouse move event
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      // Check if mouse is hovering over the "Play Again" button
      if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 &&
        mouseY <= Game.DIM_Y / 2 + 50
      ) {
        canvas.style.cursor = "pointer"; // Change cursor style to pointer
      }
      // Check if mouse is hovering over the "Back To Home" button
      else if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 + 70 &&
        mouseY <= Game.DIM_Y / 2 + 120
      ) {
        canvas.style.cursor = "pointer"; // Change cursor style to pointer
      } else {
        canvas.style.cursor = "default"; // Set default cursor style
      }
    };
  
    // Function to handle mouse click event
    const handleMouseClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      // Check if "Play Again" button is clicked
      if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 &&
        mouseY <= Game.DIM_Y / 2 + 50
      ) {
        this.restartGame(); // Restart the game
      }
      // Check if "Back To Home" button is clicked
      else if (
        mouseX >= Game.DIM_X / 2 - 100 &&
        mouseX <= Game.DIM_X / 2 + 100 &&
        mouseY >= Game.DIM_Y / 2 + 70 &&
        mouseY <= Game.DIM_Y / 2 + 120
      ) {
        window.location.href = "index.html"; // Redirect to the home page
      }
    };
  
    // Add event listeners to canvas
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);
  }

  restartGame() {
    // Define restart logic here.
    // this.endScreen.style.display = "none";
    // clearInterval(this.intervalId);
    // this.intervalId = setInterval(this.bind(ctx), 100);
    // this.intervalId = setInterval(this.bind(this), 100);
    // Reset the game state to its initial values

    // Clear the arrays for projectiles, people, and explosions
    this.projectiles = [];
    this.people = [];
    this.explosions = [];

    // // Reinitialize the game objects and variables
    this.x = 1180;
    this.y = 475;
    this.handlePeople();
    this.gameover = false;

    // // Start the game again
    // // 
    cancelAnimationFrame(this.requestAnimation);
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.hits = 0; 

      // this.ctx.beginPath();
      // this.ctx.ellipse(150, 500, 35, 65, 30, 60, 45, 15, Math.PI * 2);
      // this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      // this.ctx.fill();

    this.animate();
    
  }
  
}

export default Game;

