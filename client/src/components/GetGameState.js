import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class GetGameState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", showAlert: false, status: "", winner: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  handleSubmit(e) {
    axios
      .get(`http://localhost:3000/api/games/${this.state.id}`)
      .then((res) => {
        this.setState({
          showAlert: true,
          status: res.data.status,
          winner: res.data.winner,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      id: "",
      status: "",
      winner: "",
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

        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Get
        </Button>

        <Alert variant="secondary" show={this.state.showAlert} style={{ width: "42rem" }}>
          <Alert.Heading>Game status</Alert.Heading>
          <p>The current status is:</p>
          <p>
            <strong>Status: </strong> {this.state.status}
          </p>
          <p>
            <strong>Winner: </strong> {this.state.winner}
          </p>
        </Alert>
      </Container>
    );
  }
}
