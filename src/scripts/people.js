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

class People {
  constructor(src, x) {
    this.person0 = new Image();
    this.person0.src = src;
    this.width = 50;
    this.height = 60;
    this.x = x;
    this.y = 460;    
    this.isExploded = false;
    this.explosionFrames = 5; // Number of explosion frames
    this.currentFrame = 0; // Current explosion frame
  }

  draw(ctx) {
    if (this.isExploded) {
      // Draw explosion effect
      const explosionImage = new Image();
      explosionImage.src = "assets/game/explosion.png";
      
      // Calculate the width and height of each frame
      const frameWidth = explosionImage.width / this.explosionFrames;
      const frameHeight = explosionImage.height;

      // Draw the current frame of the explosion animation
      ctx.drawImage(
        explosionImage,
        this.currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight,
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
      ctx.drawImage(this.person0, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.x -= 3;
  }
}

export default People;