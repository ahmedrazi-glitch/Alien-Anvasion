import Game from './scripts/game.js';

document.addEventListener('DOMContentLoaded', () => {
console.log('hi');
  const canvas = document.getElementById("canvas-tag");
  const ctx = canvas.getContext('2d');

  const homeScreen = document.querySelector(".home-screen");
  const startButton = document.getElementById("start-button");
  const instrucButton = document.getElementById("instructions-button");
  const canvasSelect = document.getElementById("canvas-tag");

  function draw(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, 1200, 600);
  }
  draw(ctx);

  const game = new Game(canvasSelect);

  startButton.addEventListener("click", function() {
    homeScreen.style.display = "none";
    canvasSelect.style.display = "block";
    canvasSelect.classList.remove("hidden");

    game.start();
  });

  instrucButton.addEventListener("click", function() {
    homeScreen.style.display = "none";
    instrucButton.style.display = "block";
  });
 // input for testing purposes

 homeScreen.style.display = "none";
 canvasSelect.style.display = "block";
 canvasSelect.classList.remove("hidden");

  game.start();

 
 // everything above is for testing purposes
});

 // ctx.fillStyle = 'transparent';
    // ctx.fillRect(0, 0, 1200, 600);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);
  // }

  // ctx.fillText("This is an Alien Anvasion", 25, 50)
    // ctx.beginPath();
    // ctx.arc(75, 75, 25, 0, 2*Math.PI);
    // ctx.stroke;
    // ctx.fillStyle = "red";
    // ctx.fill();

  // const img = new Image();
  // img.src = 'spaceship.png';
  // img.onload = () => {
  // ctx.drawImage(img, 0, 0);
  // };


// console.log(canvas);



// const canvass = document.getElementById('my_game');
//   console.log(canvass);
//   const ctx = canvass.getContext('2d');
//   ctx.beginPath();
//   ctx.arc(75, 75, 25, 0, 2*Math.PI);
//   ctx.stroke();
//   ctx.fillStyle = 'blue';
//   ctx.fill();
//   window.ctx = ctx;

// ctx.fillRect(0, 0, canvas.width, canvas.height);

// ctx.fillStyle = '#000000';


