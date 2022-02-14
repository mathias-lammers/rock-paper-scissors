const { Game, games } = require("../model/game.js");
const Player = require("../model/player");
const { Move, results } = require("../model/move");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  // Only for testing, delete when done
  getGames: async (req, res) => {
    res.json(games);
  },

  /**
   * Return updated status and winner of the game with given ID
   */
  getState: async (req, res) => {
    let id = req.params.id;

    // Check if valid input ID
    if (!isValidID(id) || !id) return res.status(404).json(invalidIdMsg);

    // Update state
    if (
      games[id].players.some((player) => player.move == null) ||
      games[id].players.length < 2
    ) {
      games[id].status = "Pending";
      games[id].winner = "To be determined";
    } else {
      games[id].status = "Finished";
      let winnerIndex = getWinnerIndex(games[id].players);
      games[id].winner =
        winnerIndex == -1
          ? (games[id].winner = "Tie")
          : games[id].players[winnerIndex].name;
    }

    // Return state
    res.status(200).json({
      status: games[id].status,
      winner: games[id].winner,
    });
  },

  /**
   * Create a new game with generated UUID as key and push to games object
   */
  newGame: async (req, res) => {
    let name = req.body.name;
    if (!name) {
      res.status(409).json({
        message: `Error: unable to create new game, no name provided`,
      });
    } else {
      let uuid = uuidv4();
      games[uuid] = new Game(name);
      res.status(201).json({
        id: uuid,
        message: `Game ${uuid} successfully initialized by ${name}`,
      });
    }
  },

  /**
   * Add a player with given name to a game with given ID
   */
  joinGame: async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;

    // Check if valid input ID
    if (!isValidID(id) || !id) return res.status(400).json(invalidIdMsg);

    // Add player if eligible
    if (games[id].players.length >= 2) {
      res.status(409).json({
        message: `Error: unable to join, game ${id} already has two players`,
      });
    } else if (games[id].players.some((player) => player.name == name)) {
      res.status(409).json({
        message: `Error: unable to join, there is already a player named ${name}`,
      });
    } else {
      games[id].players.push(new Player(name));
      res.status(200).json({
        message: `Added player ${name} to game ${id}`,
      });
    }
  },

  /**
   * Update the move of a player in game with given ID
   */
  makeMove: async (req, res) => {
    let move = req.body.move.toUpperCase();
    let id = req.params.id;
    let name = req.body.name;

    // Check if valid input ID
    if (!isValidID(id) || !id) return res.status(400).json(invalidIdMsg);

    // Check if valid input move
    if (!Move.includes(move))
      return res.status(400).json({
        message: "Error: invalid move",
      });

    // Make move if eligible
    let index = games[id].players.findIndex((player) => player.name == name);
    if (index == -1) {
      res.status(400).json({
        message: `Error: no player by the name ${name} found in game ${id}`,
      });
    } else if (games[id].players[index].move != null) {
      res.status(409).json({
        message: `Error: player ${name} has already made their move`,
      });
    } else {
      games[id].players[index].move = move;
      res.status(200).json({
        message: `Player ${name} made their move`,
      });
    }
  },
};

const invalidIdMsg = {
  message: `Error: invalid game ID`,
};

/**
 * Check for existence of game with input ID
 * @param {string} id   ID to check
 * @returns             Boolean
 */
function isValidID(id) {
  return id in games;
}

/**
 * Return the index of the winning player, or -1 if the game ended in a
 * tie, by comparing the index of their moves to the results matrix
 * @param {[Player]} players   Players to compare
 * @returns                    Index in case of winning player, else -1
 */
function getWinnerIndex(players) {
  let moveIndex1 = Move.indexOf(players[0].move);
  let moveIndex2 = Move.indexOf(players[1].move);
  return results[moveIndex1][moveIndex2];
}
