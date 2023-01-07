export default class ClientEngine {
    
  constructor(canvasElement) {
    this.context = canvasElement.getContext("2d");
    
    this.sprites = [];
    this.isOn = false;
    this.frameRate = 1000 / 5; // in miliseconds
  }

  start() {
    this.isOn = true;
    this.nextFrame();
  }

  stop() {
    this.isOn = false;
  }

  nextFrame() {
    if (!this.isOn) {
      return;
    }

    if (this.isNewFrameTime()) {
      this.drawNewFrame();
    }

    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }

  isNewFrameTime() {
    const now = new Date().getTime();

    if (!this.lastTime) this.lastTime = now;

    if (now - this.lastTime >= this.frameRate) {
      this.lastTime = now;
      return true;
    }

    return false;
  }

  clearScreen() {
    this.context.fillStyle = "white";
    this.context.clearRect(0, 0, 10, 20);
  }

  drawNewFrame() {
    this.clearScreen();

    for (let sprite of this.sprites) {
      sprite.draw(this.context);
    }
  }
}
