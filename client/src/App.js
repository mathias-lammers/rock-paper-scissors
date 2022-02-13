import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Rock paper scissors</h1>
        <CreateGame />
        <JoinGame />
      </Container>
    </div>
  );
}

export default App;
