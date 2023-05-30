class Explosion {
  constructor (ctx, x) { 
    this.ctx = ctx;
    this.x = x;
    // this.width = width;
    // this.height = height;
    // this.y = 460;
    this.isExploded = false;
    this.explosionImage = new Image();
    this.explosionImage.src = "assets/game/expo/remove_bg_explosion_sprite_sheet-.png";
    
    

    // total number of explosion frames in the sprite sheet is 20, maybe I want to use 15.
    this.explosionFrames = 15; // Number of explosion frames in the sprite sheet

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

  personExploding(x, y, width, height) { // this is the draw method !! 
    // Calculate the frame coordinates   
    const frameX = (this.frameCountX - 1 - (this.currentFrame % this.frameCountX)) * this.frameWidth;
    const frameY = (this.frameCountY - 1 - Math.floor(this.currentFrame / this.frameCountX)) * this.frameHeight;
    //

    // Draw explosion effect
    this.ctx.drawImage(
      this.explosionImage,
      frameX,
      frameY,
      this.frameWidth,
      this.frameHeight,
      this.x, // this.x, 
      y, // this.y,
      width, // this.width,
      height // this.height
    );

    // Update the current frame for the next draw call
    if (this.currentFrame >= this.explosionFrames - 1) { // if I comment this out the frame may not update !!
      this.isExploded = false;
      this.currentFrame = 0;
    } else { 
      this.currentFrame++;
    }
  }

  // this.update function will update the sprite the animation and the explosion position on the canvas when the explosion replaces the person.  
  update() {
    this.x -= 3;
  }

}

export default Explosion;


