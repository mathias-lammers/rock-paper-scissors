const Player = require("./player");

class Game {
  constructor(name) {
    this.players = [new Player(name)];
    this.state = "INITIALIZED";
    this.winner = null;
  }
}

// Holds all games with UUID as key and Game objects as value
var games = {};

module.exports = { Game, games };
