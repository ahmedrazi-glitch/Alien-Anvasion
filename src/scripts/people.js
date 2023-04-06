class People{
  constructor(src, x){
    this.person0 = new Image();
    this.person0.src = src;
    this.width = 50;
    this.height = 60;
    this.x = x;
    this.y = 460;
  }

  draw(ctx){
    // console.log(this.person0);
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.x, this.y, this.width, this.height); 
    ctx.drawImage(this.person0, this.x, this.y, this.width, this.height); 
  }

  update(){
    this.x -= 3;
  }

}

export default People;
