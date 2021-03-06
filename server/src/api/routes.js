const { Router } = require("express");
const { getState, newGame, joinGame, makeMove } = require("./controller");

const router = Router();

// GET route
router.get("/games/:id", getState);

// POST routes
router.post("/games/new", newGame);
router.post("/games/:id/join", joinGame);
router.post("/games/:id/move", makeMove);

module.exports = router;
