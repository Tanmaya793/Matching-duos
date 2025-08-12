import React, { useState } from "react";
import './App.css';
import Matching from "./Matching.jsx";
import TicTac from "./TicTac.jsx"
// Future games
// import TargetStrike from "./TargetStrike.jsx";
// import PuzzleMaster from "./PuzzleMaster.jsx";

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [started, setStarted] = useState(false);

  const games = [
    {
      id: "memory",
      title: "Memory Match",
      description: "Flip the cards, find the pairs, and test your memory skills!",
      icon: "🧠",
      status: "available",
      component: Matching
    },
    {
      id: "tictac",
      title: "Tic-Tac-Toe",
      description: "Try Hard to beat the bot",
      icon: "🎯",
      status: "available",
      component: TicTac
    },
    {
      id: "puzzle",
      title: "Puzzle Master",
      description: "Solve challenging puzzles",
      icon: "🧩",
      status: "coming-soon",
      component: null
    }
    // ... more games
  ];

  const goToStartScreen = (gameId) => {
    setSelectedGame(gameId);
    setStarted(false);
  };

  const startGame = () => {
    setStarted(true);
  };

  const backToHub = () => {
    setSelectedGame(null);
    setStarted(false);
  };

  const quitGame = () => {
    setStarted(false); // goes back to that game's start screen
  };

  // 1️⃣ Game Hub screen
  if (!selectedGame) {
    return (
      <div className="app-container">
        <div className="game-platform-header">
          <h1>🎮 Game Hub</h1>
          <p className="platform-subtitle">Choose your adventure!</p>
        </div>
        <div className="games-grid">
          {games.map((g) => (
            <div
              key={g.id}
              className={`game-tile ${g.status === "available" ? "available-game" : "coming-soon-game"}`}
              onClick={() => g.status === "available" && goToStartScreen(g.id)}
            >
              <div className="game-tile-icon">{g.icon}</div>
              <h3 className="game-tile-title">{g.title}</h3>
              <p className="game-tile-description">{g.description}</p>
              <div className={`game-tile-status ${g.status}`}>
                {g.status === "available" ? "Available" : "Coming Soon"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentGame = games.find((g) => g.id === selectedGame);

  // 2️⃣ Start screen for selected game
  if (!started) {
    return (
      <div className="start-screen">
        <div className="start-card">
          <button className="back-to-hub-btn" onClick={backToHub}>
            ← Back to Game Hub
          </button>
          <div className="game-intro">
            <div className="game-icon">{currentGame.icon}</div>
            <h1 className="game-title">{currentGame.title}</h1>
            <p className="game-subtitle">{currentGame.description}</p>
          </div>
          <button onClick={startGame} className="start-button">
            ▶️ Play Now
          </button>
        </div>
      </div>
    );
  }

  // 3️⃣ Game screen
  if (started && currentGame?.component) {
    const GameComponent = currentGame.component;
    return (
      <div className="app-container">
        <GameComponent onQuit={quitGame} />
      </div>
    );
  }

  return null;
}

export default App;
