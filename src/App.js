import React from "react";
import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      Number Scramble
      <Game numberOfLetters={7} />
    </div>
  );
}

export default App;
