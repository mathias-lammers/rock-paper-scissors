import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", name: "", move: "rock", showAlert: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    await axios
      .post(`http://localhost:3000/api/games/${this.state.id}/join`, {
        name: this.state.name,
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post(`http://localhost:3000/api/games/${this.state.id}/move`, {
        name: this.state.name,
        move: this.state.move,
      })
      .then((res) => {
        this.setState({ showAlert: true });
      })
      .catch((error) => {
        console.log(error);
      });

    // this.setState({ id: "", name: "" });
  }

  render() {
    return (
      <Container>
        <h2>Join a game</h2>
        <p>Fill in the form and press "Join" to join a game</p>

        <Form.Group className="mb-3" controlId="formJoinGameId">
          <Form.Label>Game ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            placeholder="Enter game ID..."
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formJoinGameName">
          <Form.Label>Player name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter player name..."
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            Note: two players can't share name in a game.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formJoinGameMove">
          <Form.Label>Move</Form.Label>
          <Form.Control
            className="mb-3"
            as="select"
            name="move"
            onChange={this.handleChange}
          >
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Join
        </Button>

        <Alert variant="success" show={this.state.showAlert} style={{ width: "42rem" }}>
          <Alert.Heading>Success</Alert.Heading>
          <p>
            Successfully joined game <strong>{this.state.id}</strong>
          </p>
          <p>Head over to "Check game" to see who won</p>
        </Alert>
      </Container>
    );
  }
}
