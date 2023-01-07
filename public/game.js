export default function createGame() {
  const state = {
    players: {},
    screen: {
      width: 10,
      height: 10,
    },
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX =
      "playerX" in command
        ? command.playerX
        : Math.floor(Math.random() * state.screen.width);
    const playerY =
      "playerY" in command
        ? command.playerY
        : Math.floor(Math.random() * state.screen.height);

    state.players[playerId] = {
      playerId: command.playerId, // id do jogador
      x: playerX,
      y: playerY,
      moveCommand: `Idle`,
      rotation: 0,
      color: "0000FF",
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function movePlayer(command) {
    const acceptedMoves = {
      ArrowUp(player) {
        player.rotation = 0;
        if (player.y - 1 >= 0) {
          player.y = player.y - 1;
        }
      },
      ArrowRight(player) {
        player.rotation = 90;
        if (player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
      ArrowDown(player) {
        player.rotation = 180;
        if (player.y + 1 < state.screen.height) {
          player.y = player.y + 1;
        }
      },
      ArrowLeft(player) {
        player.rotation = 270;
        if (player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      },
      ArrowUpLeft(player) {
        player.rotation = 315;
        if (player.y - 1 >= 0){
          player.y = player.y - 1;
        } if(player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      },
      ArrowUpRight(player) {
        player.rotation = 45;
        if (player.y - 1 >= 0){
          player.y = player.y - 1;
        } if(player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
      ArrowDownLeft(player) {
        player.rotation = 225;
        if (player.y + 1 < state.screen.height){
          player.y = player.y + 1;
        } if(player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      },
      ArrowDownRight(player) {
        player.rotation = 135;
        if (player.y + 1 < state.screen.height){
          player.y = player.y + 1;
        } if(player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
      Idle(player) {
        return;
      }
    };

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
    }
  }

  return {
    addPlayer,
    removePlayer,
    movePlayer,
    state,
  };
}
