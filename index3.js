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
    //this.player3 = new Player(name);
    //this.player4 = new Player();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.move = null;
  }
  get name() {
    return this.name;
  }
  set move(move) {
    this.move = move;
  }
  get move() {
    return this.move;
  }
}

var games = {};

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.post("/api/games/new", (req, res) => {
  let uuid = uuidv4();
  games[uuid] = new Game(req.body.name);
  res
    .status(201)
    .send(`Game ${uuid} successfully initialized by ${req.body.name}`);
});

app.post("/api/games/:id", (req, res) => {
  // TODO
});

app.post("/api/games/:id/join", (req, res) => {
  if (games[req.params.id].player2 != null) {
    res.status(409).send(`Game ${req.params.id} already have two players`);
  } else {
    games[req.params.id].player2.name = req.body.name;
    res
      .status(200)
      .send(`Added player ${req.body.name} to game ${req.params.id}`);
  }
});

app.post("/api/games/:id/move", (req, res) => {
  if (req.body.name == games[req.params.id].player1.name) {
    games[req.params.id].player1.move = req.body.move;
  } else if (req.body.name == games[req.params.id].player2.name) {
    games[req.params.id].player2.move = req.body.move;
  } else {
    res
      .status(404)
      .send(
        `Error: No player by name ${req.body.name} found in game ${req.params.id}`
      );
  }
  res.status(200).send(`Player ${req.body.name} played ${req.body.move}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
