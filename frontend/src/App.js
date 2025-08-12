import React, { useState } from "react";
import './App.css';
import Matching from "./Matching.jsx";

function App() {
  const [started, setStarted] = useState(false);
  const [showGameHub, setShowGameHub] = useState(true);

  const goToMemoryMatchStart = () => {
    setShowGameHub(false);
    setStarted(false);
  };

  const startGame = () => {
    setStarted(true);
  };

  const backToHub = () => {
    setStarted(false);
    setShowGameHub(true);
  };

  const quitGame = () => {
    setStarted(false);
  };

  if (showGameHub && !started) {
    return (
      <div className="app-container">
        <div className="game-platform-header">
          <h1>🎮 Game Hub</h1>
          <p className="platform-subtitle">Choose your adventure!</p>
        </div>

        <div className="games-grid">
          <div className="game-tile available-game" onClick={goToMemoryMatchStart}>
            <div className="game-tile-icon">🧠</div>
            <h3 className="game-tile-title">Memory Match</h3>
            <p className="game-tile-description">Test your memory skills!</p>
            <div className="game-tile-status available">Available</div>
          </div>

          <div className="game-tile coming-soon-game">
            <div className="game-tile-icon">🎯</div>
            <h3 className="game-tile-title">Target Strike</h3>
            <p className="game-tile-description">Aim and shoot targets</p>
            <div className="game-tile-status coming-soon">Coming Soon</div>
          </div>

          <div className="game-tile coming-soon-game">
            <div className="game-tile-icon">🧩</div>
            <h3 className="game-tile-title">Puzzle Master</h3>
            <p className="game-tile-description">Solve challenging puzzles</p>
            <div className="game-tile-status coming-soon">Coming Soon</div>
          </div>

          <div className="game-tile coming-soon-game">
            <div className="game-tile-icon">🎲</div>
            <h3 className="game-tile-title">Dice Runner</h3>
            <p className="game-tile-description">Roll your way to victory</p>
            <div className="game-tile-status coming-soon">Coming Soon</div>
          </div>

          <div className="game-tile coming-soon-game">
            <div className="game-tile-icon">⚡</div>
            <h3 className="game-tile-title">Speed Challenge</h3>
            <p className="game-tile-description">Fast-paced action game</p>
            <div className="game-tile-status coming-soon">Coming Soon</div>
          </div>

          <div className="game-tile coming-soon-game">
            <div className="game-tile-icon">🏆</div>
            <h3 className="game-tile-title">Quiz Champion</h3>
            <p className="game-tile-description">Knowledge-based challenges</p>
            <div className="game-tile-status coming-soon">Coming Soon</div>
          </div>
        </div>
      </div>
    );
  }

  if (!showGameHub && !started) {
    return (
      <div className="start-screen">
        <div className="start-card">
          <button className="back-to-hub-btn" onClick={backToHub}>
            ← Back to Game Hub
          </button>

          <div className="game-intro">
            <div className="game-icon">🧠</div>
            <h1 className="game-title">Memory Match Game</h1>
            <p className="game-subtitle">
              Flip the cards, find the pairs, and test your memory skills!
            </p>
          </div>

          <button onClick={startGame} className="start-button">
            ▶️ Play Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Matching onQuit={quitGame} />
    </div>
  );
}

export default App;
