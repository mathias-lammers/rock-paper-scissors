import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleIdChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit(e) {
    let url = `http://localhost:3000/api/games/${this.state.id}/join`;
    axios
      .post(url, {
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

        <Form.Group className="mb-3" controlId="formJoinGameId">
          <Form.Label>Game ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter game ID..."
            onChange={this.handleIdChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formJoinGameName">
          <Form.Label>Player name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player name..."
            onChange={this.handleNameChange}
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
