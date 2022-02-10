// Possible moves that a player can make
const Move = ["ROCK", "PAPER", "SCISSORS"];

// Result matrix of comparing the index of two
// players moves in Move. A tie equals -1
const results = [
  [-1, 1, 0],
  [0, -1, 1],
  [1, 0, -1],
];

module.exports = { Move, results };
