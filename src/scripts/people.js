class People {

  constructor(src, x, ctx) {
    this.ctx = ctx;
    this.person0 = new Image();
    this.person0.src = src;
    this.width = 50;
    this.height = 60;
    this.x = x;
    this.y = 460;
    
  }

  draw(ctx) {
    ctx.drawImage(this.person0, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= 3;
  }

}

export default People;


// class People {
//   constructor(src, x, ctx) {
//     this.ctx = ctx;
//     this.personImage = new Image();
//     this.personImage.src = src;
//     this.frameCountX = 5; // Number of horizontal frames in the sprite sheet
//     this.frameWidth = this.personImage.width / this.frameCountX;
//     this.frameHeight = this.personImage.height; // Assuming each frame has the same height
//     this.frameIndex = 0; // Current frame index
//     this.animationSpeed = 0.2; // Speed of animation
//     this.width = 50;
//     this.height = 60;
//     this.x = x;
//     this.y = 460;
//   }

//   draw() {
//     // Calculate the frame coordinates
//     const frameX = this.frameIndex * this.frameWidth;

//     this.ctx.drawImage(
//       this.personImage,
//       frameX,
//       0,
//       this.frameWidth,
//       this.frameHeight,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }

//   update() {
//     // Increment the frame index based on the animation speed
//     this.frameIndex += this.animationSpeed;

//     // If the frame index exceeds the number of frames, reset it to 0
//     if (this.frameIndex >= this.frameCountX) {
//       this.frameIndex = 0;
//     }

//     this.x -= 3;
//   }
// }

// export default People;