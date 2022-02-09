const { Game, games } = require("../services/game.js");
const Player = require("../services/player");
const Move = require("../services/move");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getGames: async (req, res) => {
    res.json(games);
  },
  getState: async (req, res) => {
    let id = req.params.id;
    if (!isValidID(id)) {
      return res.status(404).json({
        message: `Error: Invalid game ID`,
      });
    }
    res.status(200).json(games[id].state);
  },
  updateState: async (req, res) => {
    let id = req.params.id;
    if (!isValidID(id)) {
      return res.status(404).json({
        message: `Error: Invalid game ID`,
      });
    }
    if (games[id].players.some((player) => player.move == null)) {
      games[id].state = "PENDING";
    } else {
      // TODO Check that two players have played
      games[id].state = "FINISHED";
      let winnerIndex = getWinnerIndex(games[id].players);
      if (winnerIndex == -1) {
        games[id].winner = "TIE";
      } else {
        games[id].winner = games[id].players[winnerIndex].name;
      }
    }
    res.sendStatus(200);
  },
  newGame: async (req, res) => {
    let uuid = uuidv4();
    games[uuid] = new Game(req.body.name);
    res.status(201).json({
      id: uuid,
      message: `Game ${uuid} successfully initialized by ${req.body.name}`,
    });
  },
  joinGame: async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    if (!isValidID(id)) {
      return res.status(404).json({
        message: `Error: Invalid game ID`,
      });
    }
    if (games[id].players.length >= 2) {
      res.status(409).json({
        message: `Unable to join, game ${id} already has two players`,
      });
    } else if (games[id].players.some((player) => player.name == name)) {
      res.status(409).json({
        message: `Unable to join, there is already a player named ${name}`,
      });
    } else {
      games[id].players.push(new Player(name));
      res.status(200).json({
        message: `Added player ${name} to game ${id}`,
      });
    }
  },
  makeMove: async (req, res) => {
    let move = req.body.move.toUpperCase();
    let id = req.params.id;
    let name = req.body.name;
    if (!isValidID(id) || !isValidMove(move)) {
      return res.status(404).json({
        validID: isValidID, // TODO Check why these does not show
        validMove: isValidMove,
        message: `Error: Either invalid game ID or move`,
      });
    }
    let index = games[id].players.findIndex((player) => player.name == name);
    if (index == -1) {
      res.status(404).json({
        message: `Error: No player by the name ${name} found in game ${id}`,
      });
    } else {
      games[id].players[index].move = move;
      res.status(200).json({
        message: `Player ${name} played ${move}`,
      });
    }
  },
};

function isValidID(id) {
  return id in games;
}

function isValidMove(move) {
  return Move.includes(move);
}

function getWinnerIndex(players) {
  let moveIndex1 = Move.indexOf(players[0].move);
  let moveIndex2 = Move.indexOf(players[1].move);
  let results = [
    [-1, 1, 0],
    [0, -1, 1],
    [1, 0, -1],
  ];
  return results[moveIndex1][moveIndex2];
}
