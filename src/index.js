const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

class Game {
  constructor(player1) {
    this.player1Name = player1;
    this.player2Name = null;
    this.player1Move = null;
    this.player2Move = null;
    this.winner = null;
  }
}

var games = {};

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.post("/api/games/new", (req, res) => {
  let name = req.body.name;
  let game = new Game(name);
  let uuid = uuidv4();
  games[uuid] = game;
  console.log(`Player ${name} initialized a game with ID ${uuid}`);
  res.status(201).send(`Game ${uuid} successfully initialized`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
