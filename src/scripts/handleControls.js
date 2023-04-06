class HandleControls{
  constructor(){
    this.keys = [];
    window.addEventListener('keydown', e => {
      console.log(e.key);
      if (e.key === " "){
        this.keys.push(e.key);
      }
    });
  }
}

export default HandleControls;