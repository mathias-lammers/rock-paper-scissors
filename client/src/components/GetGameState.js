import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class GetGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit(e) {
    let url = `http://localhost:3000/api/games/${this.state.id}`;
    axios
      .get(url)
      .then((res) => {
        alert(`Winner: ${res.data.winner}, state: ${res.data.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      id: "",
    });
  }

  render() {
    return (
      <Container>
        <h2>Get state of game</h2>
        <p>Fill in the form and press "Get" to get the current state of a game</p>

        <Form.Group className="mb-3" controlId="formGetGameStateID">
          <Form.Label>Game ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter game ID..."
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Get
        </Button>
      </Container>
    );
  }
}
