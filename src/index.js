const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

class Game {
  constructor(name) {
    this.player1 = {
      name: name,
      move: null,
    };
    this.player2 = {
      name: null,
      move: null,
    };
  }
}

var games = {};

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.post("/api/games/new", (req, res) => {
  let uuid = uuidv4();
  games[uuid] = new Game(req.body.name);
  console.log(`Player ${req.body.name} initialized game ${uuid}`);
  res.status(201).send(`Game ${uuid} successfully initialized`);
});

app.post("/api/games/:id/join", (req, res) => {
  games[req.params.id].player2.name = req.body.name;
  console.log(`Player ${req.body.name} joined game ${req.params.id}`);
  res
    .status(200)
    .send(`Added player ${req.body.name} to game ${req.params.id}`);
});

app.post("/api/games/:id/move", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let move = req.body.move;
  let game = games[id];
  if (name == game.player1.name) {
    game.player1.move = move;
  } else if (name == game.player2.name) {
    game.player2.move = move;
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
