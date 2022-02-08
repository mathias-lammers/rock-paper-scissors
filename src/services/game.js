const Player = require("./player");

module.exports = class Game {
  constructor(name) {
    this.players = [new Player(name)];
    this.state = "INITIALIZED";
    this.winner = null;
  }
};
