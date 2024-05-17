import Button from "./components/Button";
// import ButtonGroup from "./components/ButtonGroup";

function App() {
  return (
    <div>
      <h1>Hello, Niko and Thomas! Let's get started on this project :)</h1>
      <div>
        <div className="row align-items-center">
          <div className="col">
            <Button onClick={() => console.log("first")}>User 1</Button>
          </div>
          <div className="col">
            <Button onClick={() => console.log("second")} color="danger">
              User 2
            </Button>
          </div>
          <div className="col">
            <Button onClick={() => console.log("third")}>User 3</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
