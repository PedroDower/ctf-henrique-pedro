const stateEmitter = (game, io, roomId) => {
  const isOn = true;
  const frameRate = 20;
  const frameRateInMs = 1000 / frameRate;
  const movePlayers = (game) => {
    for (let playerId in game.state.players) {
      const player = game.state.players[playerId];
      game.movePlayer({playerId: playerId, keyPressed: player.moveCommand});
    }
  };
  const nextFrame = () => {
    const sendInterval = setInterval(() => {
    movePlayers(game);
      
    
      console.log("sending state to client");
      io.room(roomId).emit("state", game);
    }, frameRateInMs);

    if (!isOn) {
      clearInterval(sendInterval);
      return;
    }

    io.room(roomId).emit("state", game);
  };

  nextFrame();
};

export default stateEmitter;
