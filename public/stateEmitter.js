const stateEmitter = (state, io, roomId) => {
  const isOn = true;
  const frameRate = 20;
  const frameRateInMs = 1000 / frameRate;
  const nextFrame = () => {
    const sendInterval = setInterval(() => {
    
      console.log("sending state to client");
      io.room(roomId).emit("state", state);
    }, frameRateInMs);

    if (!isOn) {
      clearInterval(sendInterval);
      return;
    }

    io.room(roomId).emit("state", state);
  };

  nextFrame();
};

export default stateEmitter;
