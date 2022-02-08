const { Router } = require("express");
const {
  getGames,
  getState,
  updateState,
  newGame,
  joinGame,
  makeMove,
} = require("./controller");

const router = Router();

// GET route
router.get("/games", getGames); // For testing
router.get("/games/:id", getState);

// POST routes
router.post("/games/new", newGame);
router.post("/games/:id/join", joinGame);
router.post("/games/:id/move", makeMove);
router.post("/games/:id/update", updateState);

module.exports = router;
