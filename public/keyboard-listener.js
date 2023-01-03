export default function createKeyboardListener(document) {
  const state = {
    playerId: null,
  };

  function registerPlayerId(playerId) {
    state.playerId = playerId;
  }

  document.addEventListener("keydown", handleKeydown);

  function handleKeydown(event) {
    const keyPressed = event.key;

    const command = {
      type: "move-player",
      playerId: state.playerId,
      keyPressed,
    };
  }

  return {
    subscribe,
    registerPlayerId,
  };
}
