import Game from './scripts/game.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas-tag");
  const ctx = canvas.getContext('2d');

  const homeScreen = document.querySelector(".home-screen");
  const startButton = document.getElementById("start-button");
  const instrucButton = document.getElementById("instructions-button");

  // A reference to the back button element
  const backButton = document.querySelector('.back');

  // A click event listener to the back button
  backButton.addEventListener('click', function() {
    // Navigate back to the home page
    window.location.href = 'index.html';
  });

  // musicButton.addEventListener('click', toggleLine);
  const musicButton = document.getElementById('music');
  musicButton.classList.add('line-visible');

  function toggleLine() {
    const audio = document.getElementById('background-audio');
    const musicButton = document.getElementById('music');
    
    if (audio.paused) {
      musicButton.classList.remove('paused');
      audio.play();
      musicButton.classList.add('play');
      musicButton.classList.remove('line-visible');
    } else {
      musicButton.classList.remove('play');
      audio.pause();
      musicButton.classList.add('paused');
      musicButton.classList.add('line-visible');
    }
  }

  musicButton.addEventListener('click', toggleLine);

  const instrucSelect = document.getElementById("hidden");

  // Getting the instructions button element
  const instructionsButton = document.getElementById('instructions-button');

  // Getting the instructions element
  const instructions = document.getElementById('hidden');

  // Adding an event listener to the instructions button
  instructionsButton.addEventListener('click', () => {
    console.log('Instructions button clicked');
    console.log('Instructions element:', instructions);
    console.log(instrucSelect);

    homeScreen.style.display = "none";
    instrucSelect.removeAttribute("id"); 
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

