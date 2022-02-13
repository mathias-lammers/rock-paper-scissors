import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import GetGameState from "./GetGameState";
import { Routes, Route, Link } from "react-router-dom";

export default class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div>
        <div>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>Rock paper scissors</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/"}>
                    New game
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/join"}>
                    Join game
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/check"}>
                    Check game
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<CreateGame />} />
            <Route path="/join" element={<JoinGame />} />
            <Route path="/check" element={<GetGameState />} />
          </Routes>
        </div>
      </div>

      // <div>
      //   <div>
      //     <Navbar>
      //       <Navbar.Brand as={Link} to="/">
      //         React-Bootstrap
      //       </Navbar.Brand>
      //       <Navbar.Collapse>
      //         <Nav className="me-auto">
      //           <Nav.Item eventkey={1} href="/">
      //             <Nav.Link as={Link} to="/">
      //               Home
      //             </Nav.Link>
      //           </Nav.Item>
      //         </Nav>
      //       </Navbar.Collapse>
      //     </Navbar>
      //   </div>
      //   <div>
      //     <Routes>
      //       <Route exact path="/" component={CreateGame} />
      //       <Route
      //         render={function () {
      //           return <p>Not found</p>;
      //         }}
      //       />
      //     </Routes>
      //   </div>
      // </div>
    );
  }
}
