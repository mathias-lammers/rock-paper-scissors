import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", name: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    axios
      .post(`http://localhost:3000/api/games/${this.state.id}/join`, {
        name: this.state.name,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error);
      });
    this.setState({ id: "", name: "" });
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

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Join
        </Button>
      </Container>
    );
  }
}
