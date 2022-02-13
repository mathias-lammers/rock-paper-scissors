import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", move: "rock" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    axios
      .post("http://localhost:3000/api/games/new", {
        name: this.state.move,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      name: "",
      move: "",
    });
  }

  render() {
    return (
      <Container>
        <h2>Create a new game</h2>
        <p>Fill in the form and press "Create" to create a new game</p>

        <Form.Group className="mb-3" controlId="formNewGameName">
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

        <Form.Group controlId="formBasicSelect">
          <Form.Label>Move</Form.Label>
          <Form.Control as="select" name="move" onChange={this.handleChange}>
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Create
        </Button>
      </Container>
    );
  }
}
