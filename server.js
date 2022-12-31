import express from "express";
import http from "http";
import createGame from "./public/game.js";
import geckos from "@geckos.io/server";

const app = express();
const server = http.createServer(app);

const io = geckos();

io.listen();

app.use(express.static("public"));

const game = createGame();
game.start();

game.subscribe((command) => {
  console.log(`> Emitting ${command.type}`);
  io.emit(command.type, command);
});

io.onConnection((channel) => {
  console.log(`> Player connected: ${channel.id}`);

  channel.onDisconnect(() => {
    game.removePlayer({ playerId: playerId });

    console.log(`${channel.id} got disconnected`);
  });

  const playerId = channel.id;
  game.addPlayer({ playerId: playerId });
  channel.emit("setup", game.state);

  channel.on("move-player", (command) => {
    command.playerId = playerId;
    command.type = "move-player";

    game.movePlayer(command);
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
