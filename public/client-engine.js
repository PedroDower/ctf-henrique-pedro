class ClientEngine {
  sprites = [];
  isOn = false;

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

  draw() {
    for (let sprite of this.sprites) {
      this.sprite.draw();
    }
  }
}
