export default class KeyboardListener {
  keysCallback = new Map();
  keysPressed = new Map();
  playerId;

  constructor(document, playerId) {
    document.addEventListener("keydown", e => this.handleKeydown(e));
    document.addEventListener("keyup", e => this.handleKeyup(e));

    this.playerId = playerId;
  }

  handleKeydown(event) {
    const keyPressed = event.key;

    this.keysPressed.set(keyPressed, true);
  }

  handleKeyup(event) {
    const keyPressed = event.key;

    this.keysPressed.set(keyPressed, false);
  }
}
