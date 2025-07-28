import React, { useState } from "react";
import './App.css';
import Game from "./Game.js"

function App() {

  const [started, setStarted] = useState(false);

  const startGame = () => {
    setStarted(true);
  };

  return (
    <div className="app-container">
      {!started ? (
        <div className="start-screen">
          <h1>🧠 Memory Match Game</h1>
          <button onClick={startGame} className="start-button">
            ▶️ Play
          </button>
        </div>
      ) : (
        <Game onQuit={() => setStarted(false)} />
      )}
    </div>
  );
}

export default App;
