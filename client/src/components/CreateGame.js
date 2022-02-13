import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    axios
      .post("http://localhost:3000/api/games/new", {
        name: this.state.name,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <h1>Create a new game</h1>
        <Form.Group className="mb-3" controlId="formNewGameName">
          <Form.Label>Enter your name to create a new game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Player name"
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            Note: two players can't share name in a game.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Create
        </Button>
      </Container>
    );
  }
}
