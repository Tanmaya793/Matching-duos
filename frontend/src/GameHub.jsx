import React from "react";
import './styles/hub.css'

function GameHub({ onSelectGame }) {
  return (
    <div className="app-container">
      <div className="game-platform-header">
        <h1>🎮 Game Hub</h1>
        <p className="platform-subtitle">Choose your adventure!</p>
      </div>

      <div className="games-grid">
        <div
          className="game-tile available-game"
          onClick={() => onSelectGame("memory")}
        >
          <div className="game-tile-icon">🧠</div>
          <h3 className="game-tile-title">Memory Match</h3>
          <p className="game-tile-description">Test your memory skills!</p>
          <div className="game-tile-status available">Available</div>
        </div>

        <div
            className="game-tile available-game"
            onClick={() => onSelectGame("tic-tac-toe")}
        >
            <div className="game-tile-icon">❌⭕</div>
            <h3 className="game-tile-title">Tic Tac Toe</h3>
            <p className="game-tile-description">The classic game of Xs and Os!</p>
            <div className="game-tile-status available">Available</div>
        </div>


        <div className="game-tile coming-soon-game">
          <div className="game-tile-icon">🎯</div>
          <h3 className="game-tile-title">Target Strike</h3>
          <p className="game-tile-description">Aim and shoot targets</p>
          <div className="game-tile-status coming-soon">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}

export default GameHub;
