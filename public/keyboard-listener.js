const KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
};

const COMMANDS = {
  MOVE_UP: "ArrowUp",
  MOVE_RIGHT: "ArrowRight",
  MOVE_DOWN: "ArrowDown",
  MOVE_LEFT: "ArrowLeft",
  MOVE_UP_LEFT: "ArrowUpLeft",
  MOVE_UP_RIGHT: "ArrowUpRight",
  MOVE_DOWN_LEFT: "ArrowDownLeft",
  MOVE_DOWN_RIGHT: "ArrowDownRight",
  IDLE: "Idle",
};

export default class KeyboardListener {
  keysCallback = new Map();
  keysPressed = new Map();
  onCommand;

  constructor(document) {
    // document.addEventListener("keydown", e => this.handleKeydown(e));
    // document.addEventListener("keyup", e => this.handleKeyup(e));
  }

  handleKeydown(event) {
    const keyPressed = event.key;

    if (this.keysPressed.get(keyPressed) === true) {
      return;
    }

    this.keysPressed.set(keyPressed, true);
    this.generateComands();
  }

  handleKeyup(event) {
    const keyPressed = event.key;

    if (this.keysPressed.get(keyPressed) === false) {
      return;
    }

    this.keysPressed.set(keyPressed, false);
    this.generateComands();
  }

  generateComands() {
    const movementKeyMap = {
      [KEYS.ARROW_UP]: COMMANDS.MOVE_UP,
      [KEYS.ARROW_RIGHT]: COMMANDS.MOVE_RIGHT,
      [KEYS.ARROW_DOWN]: COMMANDS.MOVE_DOWN,
      [KEYS.ARROW_LEFT]: COMMANDS.MOVE_LEFT,
    };
    let command = undefined;

    this.keysPressed.forEach((pressed, key) => {
      if (!pressed) return;

      command = movementKeyMap[key];
    });

    if (command === undefined) {
      command = COMMANDS.IDLE;
    }

    this.emitCommand(command);
  }

  emitCommand(command) {
    this.onCommand(command);
  }
}
