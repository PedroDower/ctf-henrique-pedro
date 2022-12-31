class ClientEngine {
  sprites = [];
  isOn = false;
  frameRate = 20; // in miliseconds

  constructor(canvasElement) {
    const context = canvasElement.getContext("2d");
    context.fillStyle = "white";
    context.clearRect(0, 0, 10, 20);
  }

  start() {
    this.isOn = true;

    window.requestAnimationFrame(this.nextFrame);
  }

  stop() {
    this.isOn = false;
  }

  nextFrame() {
    if (!this.isOn && !this.isNewFrameTime()) {
      return;
    }

    this.clearScreen();
    this.draw();
  }

  isNewFrameTime() {
    const now = new Date().getTime();

    if (!this.lastTime) this.lastTime = now;

    return now - this.lastTime < this.frameRate;
  }

  draw() {
    for (let sprite of this.sprites) {
      this.sprite.draw();
    }
  }
}
