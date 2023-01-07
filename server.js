import express from "express";
import http from "http";
import createGame from "./public/game.js";
import geckos from "@geckos.io/server";
import stateEmitter from "./public/stateEmitter.js";

const app = express();
const server = http.createServer(app);

const io = geckos();

io.listen();

app.use(express.static("public"));

const game = createGame();

io.onConnection((channel) => {
  stateEmitter(game, io, "room1");
  console.log(`> Player connected: ${channel.id}`);
  channel.join("room1");
  channel.onDisconnect(() => {
    game.removePlayer({ playerId: channel.id });
    console.log(`${channel.id} got disconnected`);
  });

  const playerId = channel.id;
  game.addPlayer({ playerId: playerId });
  channel.emit("setup", game.state);

  channel.on("move-player", (command) => {
    game.state.players[playerId].moveCommand = command.keyPressed;
    command.playerId = playerId;
    command.type = "move-player";
  });

  channel.on("chat message", (data) => {
    console.log(`got ${data} from "chat message"`);
    // emit the "chat message" data to all channels in the same room
    io.room(channel.roomId).emit("chat message", data);
  });
});

server.listen(4000, () => {
  console.log(`> Server listening on port: 4000`);
});
