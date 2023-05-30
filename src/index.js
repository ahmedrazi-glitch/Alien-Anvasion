import Game from './scripts/game.js';

document.addEventListener('DOMContentLoaded', () => {
console.log('hi');
  const canvas = document.getElementById("canvas-tag");
  const ctx = canvas.getContext('2d');

  const homeScreen = document.querySelector(".home-screen");
  const startButton = document.getElementById("start-button");
  const instrucButton = document.getElementById("instructions-button");

  // Just like home screen, I am grabing end screen. 
  // const instrucScreen = document.querySelector(".instruc");

  const instrucSelect = document.getElementById("hidden");

  // Get the instructions button element
  const instructionsButton = document.getElementById('instructions-button');

  // Get the instructions element
  const instructions = document.getElementById('hidden');

  // Add event listener to the instructions button
  instructionsButton.addEventListener('click', () => {
    console.log('Instructions button clicked');
    console.log('Instructions element:', instructions);
    console.log(instrucSelect);

    homeScreen.style.display = "none";
    instrucSelect.removeAttribute("id"); 
    // instrucSelect.style.display = "block";
    


    // Toggle the visibility of the instructions element
    // instructions.classList.toggle('hidden');
    // Toggle the display of the instructions element
    // if (instructions.style.display === 'none' || instructions.style.display === '') {
    //   instructions.style.display = 'block';
    // } else {
    //   instructions.style.display = 'none';
    // }
    // Toggle the visibility of the instructions element

  });

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

});

