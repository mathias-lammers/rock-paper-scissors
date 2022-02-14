# rock-paper-scissors

A node.js RESTful API that let's a player challenge another in a game of Rock, paper, scissors.

## Install

Clone project to directory of your choice and install necessary dependencies in both `client` and `server` folder:

```
$ cd client/
$ npm install
```

```
$ cd server/
$ npm install
```

## Run

Start the server by executing the following from the `server/` directory:

```
$ npm start
```

The server will now be listening at `http://localhost:3001/`.

Likewise, start the client by executing the following from the `client/` directory:

```
$ npm start
```

The client should open automatically in your browser, but if not, it is available at `http://localhost:3000/`.

## Use

Either use the app through the GUI (work in progress) or manually send requests, for example with the help of Postman, to the endpoints of the API. In the following sections, the variable `id` refers to a generated
[uuidv4](https://www.npmjs.com/package/uuid).

### `GET /api/games/:id`

Updates and returns the state of a game. Checks that a valid game ID has been included in the request parameters. If successful, the following is included in the response body:

```json
{
  "status": "Pending",
  "winner": null
}
```

If both players have made their moves, the winner is announced as well:

```json
{
  "status": "Finished",
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

A successful response from the server include the generated `id` for that game:

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
- Add player moves to finished `GET /api/games/:id` endpoint
- Make separate classes of each move?
- Let players have same name
- Reset forms after submitting
