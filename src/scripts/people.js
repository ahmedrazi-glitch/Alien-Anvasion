// class People{
//   constructor(src, x){
//     this.person0 = new Image();
//     this.person0.src = src;
//     this.width = 50;
//     this.height = 60;
//     this.x = x;
//     this.y = 460;
//     this.isExploded = false; 
//   } 

//   draw(ctx){
//     ctx.strokeStyle = "white";
//     ctx.strokeRect(this.x, this.y, this.width, this.height); 
//     ctx.drawImage(this.person0, this.x, this.y, this.width, this.height); 
//   }

//   update(){
//     this.x -= 3;
//   }

// }

// export default People;

// class People {
//   constructor(src, x) {
//     this.person0 = new Image();
//     this.person0.src = src;
//     this.width = 50;
//     this.height = 60;
//     this.x = x;
//     this.y = 460;    
//     this.isExploded = false;
//     this.explosionFrames = 5; // Number of explosion frames 
//     this.currentFrame = 0; // Current explosion frame
//   }

//   draw(ctx) {
//     if (this.isExploded) {
//       // Draw explosion effect
//       const explosionImage = new Image();
//       explosionImage.src = "assets/game/explosion.png";
      
//       // Calculate the width and height of each frame
//       const frameWidth = explosionImage.width / this.explosionFrames;
//       const frameHeight = explosionImage.height;

//       // Draw the current frame of the explosion animation
//       ctx.drawImage(
//         explosionImage,
//         this.currentFrame * frameWidth,
//         0,
//         frameWidth,
//         frameHeight,
//         this.x,
//         this.y,
//         this.width,
//         this.height
//       );

//       // Update the current frame for the next draw call
//       this.currentFrame++;
      
//       // Reset the explosion animation once all frames have been drawn
//       if (this.currentFrame >= this.explosionFrames) {
//         this.isExploded = false;
//         this.currentFrame = 0;
//       }
//     } else {
//       // Draw the person's image
//       ctx.drawImage(this.person0, this.x, this.y, this.width, this.height);
//     }
//   }

//   update() {
//     this.x -= 3;
//   }
// }

// export default People;

import Game from "./game";

class People {
  constructor(src, x, ctx) {
    this.ctx = ctx;
    this.person0 = new Image();
    this.person0.src = src;
    this.width = 50;
    this.height = 60;
    this.x = x;
    this.y = 460;
    this.isExploded = false;
    this.explosionImage = new Image();
    this.explosionImage.src = "assets/game/explosion_sprite_sheet.png";

    // total number of explosion frames in the sprite sheet is 20, maybe I want to use 15.
    this.explosionFrames = 15; // Number of explosion frames in the sprite sheet
    // total number of explosion frames in the sprite sheet is 20, maybe I want to use 15.

    this.currentFrame = 0; // Current explosion frame

    this.frameCountX = 5; //horizontal Explosion Frames (left to right)
    this.frameWidth = this.explosionImage.width / this.frameCountX;

    this.frameCountY = 4;
    // this.frameHeight = this.explosionImage.height;
    this.frameHeight = this.explosionImage.height / this.frameCountY;

    ///NEW CODE FROM HERE 


    // Define a flag to indicate whether the explosion image is fully loaded
    this.isExplosionImageLoaded = false;

    // Set up a listener for the image load event
    this.explosionImage.addEventListener("load", () => {
      // Once the explosion image is loaded, perform the necessary setup
      this.isExplosionImageLoaded = true;

      this.frameCountX = 5; // Number of horizontal explosion frames (left to right)
      this.frameWidth = this.explosionImage.width / this.frameCountX;

      this.frameCountY = 4; // Number of vertical explosion frames (top to bottom)
      this.frameHeight = this.explosionImage.height / this.frameCountY;
    });
  }


  personExploding(isExploded) {
    if (isExploded === true) {
      // Calculate the frame coordinates
      const frameX = (this.currentFrame % this.frameCountX) * this.frameWidth;
      const frameY = Math.floor(this.currentFrame / this.frameCountX) * this.frameHeight;
  
      // Draw explosion effect
      this.ctx.drawImage(
        this.explosionImage,
        frameX,
        frameY,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
  
      // Update the current frame for the next draw call
      this.currentFrame++;
  
      // Reset the explosion animation once all frames have been drawn
      if (this.currentFrame >= this.explosionFrames) {
        this.isExploded = false;
        this.currentFrame = 0;
      }
    } else {
      // Draw the person's image
      this.ctx.drawImage(this.person0, this.x, this.y, this.width, this.height);
    }
  }

  draw(ctx) {
    ctx.drawImage(this.person0, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= 3;
  }
}

export default People;