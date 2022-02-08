const Game = require("../services/game.js");
const Player = require("../services/player");
const { v4: uuidv4 } = require("uuid");

var games = {};

module.exports = {
  getGames: async (req, res) => {
    res.send(games);
  },
  newGame: async (req, res) => {
    let uuid = uuidv4();
    games[uuid] = new Game(req.body.name);
    res
      .status(201)
      .send(`Game ${uuid} successfully initialized by ${req.body.name}`);
  },
  joinGame: async (req, res) => {
    if (games[req.params.id].players.length >= 2) {
      res.status(409).send(`Game ${req.params.id} already have two players`);
    } else {
      games[req.params.id].players.push(new Player(req.body.name));
      res
        .status(200)
        .send(`Added player ${req.body.name} to game ${req.params.id}`);
    }
  },
  makeMove: async (req, res) => {
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
  },
};
