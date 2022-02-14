import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", move: "rock", showAlert: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    await axios
      .post("http://localhost:3000/api/games/new", {
        name: this.state.name,
      })
      .then((res) => {
        this.setState({ id: res.data.id });
        axios
          .post(`http://localhost:3000/api/games/${res.data.id}/move`, {
            name: this.state.name,
            move: this.state.move,
          })
          .then((res) => {
            this.setState({ showAlert: true });
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      })
      .catch((error) => {
        alert(error.response.data.message);
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

        <Form.Group controlId="formNewGameMove">
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

        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Create
        </Button>

        <Alert variant="success" show={this.state.showAlert} style={{ width: "42rem" }}>
          <Alert.Heading>Success</Alert.Heading>
          <p>Game was successfully initialized with the following ID:</p>
          <p>
            <strong>{this.state.id}</strong>
          </p>
          <p>Share it to challenge a friend (or enemy)</p>
        </Alert>
      </Container>
    );
  }
}
