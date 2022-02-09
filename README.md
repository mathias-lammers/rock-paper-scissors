# rock-paper-scissors

A node.js RESTful API that let's a player challenge another in a game of Rock, paper, scissors.

## Install

Clone project to directory of your choice and install necessary dependencies:

```
$ npm install
```

## Run

Start the server by executing the following from the root directory:

```
$ node src/
```

The server will now be listening at `http://localhost:3000/`.

## Use

Either use the app through the GUI (not yet implemented) or manually send requests, for example with the help of Postman, to the endpoints of the API. In the following sections, the variable `id` refers to a generated
[uuidv4](https://www.npmjs.com/package/uuid).

### `GET /api/games/:id`

Updates and returns the state of a game:

```json
{
  "status": "PENDING",
  "winner": null
}
```

If both players have made their moves, the winner is announced as well:

```json
{
  "status": "FINISHED",
  "winner": "Player2"
}
```

### `POST /api/games`

Creates a new game. Include the player's name in the request body:

```json
{
  "name": "Player1"
}
```

The response from the server include the generated `id` for that game:

```json
{
  "id": "fb7f9428-aaf0-48f9-9cbf-a6b3b362d9c3",
  "message": "Game fb7f9428-aaf0-48f9-9cbf-a6b3b362d9c3 successfully initialized by Player1"
}
```

### `POST /api/games/:id/join`

Join a game with a given `id`. Include the player's name in the request body:

```json
{
  "name": "Player2"
}
```

If successful, the response provide a confirmation:

```json
{
  "message": "Added player Player2 to game 49fbcd1f-d30e-4404-b7e0-88191e9bba0d"
}
```

### `POST api/games/:id/move`

Make a move of either "rock", "paper" or "scissors" (case insensitive). Include the player's name and move in the request body:

```json
{
  "name": "Player1",
  "move": "rock"
}
```

If successful, the response provide a confirmation:

```json
{
  "message": "Player Player1 made their move"
}
```

## TODOs

- Confirm that request body and parameters contain expected data
- Add unit tests
- Implement a GUI
- Add player moves to finished `GET /api/games/:id` endpoint
