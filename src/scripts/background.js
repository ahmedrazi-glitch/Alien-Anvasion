// import Game from './scripts/game.js';

// class Background {
//   constructor(gameWidth, gameHeight){
//     this.gameWidth = gameWidth;
//     this.gameHeight = gameHeight; 
//     const myInstance = new Game();
//     this.img = myInstance.background;
//     this.x = 0;
//     this.y = 0;
//     this.width = myInstance.DIM_X;
//     this.height = myInstance.DIM_Y;
//     this.speed = 10
//   }

//   draw(ctx){
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
//   }

//   update(){
//     this.x -= this.speed;
//   }
// }

// export default Background;



// import Game from './scripts/game.js';

// class Background {
//   constructor(gameWidth, gameHeight){
//     this.gameWidth = gameWidth;
//     this.gameHeight = gameHeight; 
//     const myInstance = new Game();
//     this.img = myInstance.background.img;
//     this.x = 0;
//     this.y = 0;
//     this.width = myInstance.DIM_X;
//     this.height = myInstance.DIM_Y;
//     this.speed = 10
//   }

//   draw(ctx){
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
//   }

//   update(){
//     this.x -= this.speed;
//   }
// }

// export default Background;

// import Game from './scripts/game.js';

class Background {
  constructor(width, height) {
    this.img = new Image();
    this.img.src = "assets/game/background3.webp";
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
  }

  update() {
    this.x -= 3;
    if (this.x < -this.width) {
      this.x = 0;
    }
  }
}

export default Background;


