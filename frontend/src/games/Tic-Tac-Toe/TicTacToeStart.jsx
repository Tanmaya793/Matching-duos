import React from "react";
import '../../styles/start-screen.css';

function TicTacToeStart({ onBack, onStart }) {
  return (
    <div className="start-screen">
        <button className="back-to-hub-btn" onClick={onBack}>
          ← Back to Game Hub
        </button>
      <div className="start-card">
        

        <div className="game-intro">
          <div className="game-icon">❌⭕</div>  {/* You can customize icon */}
          <h1 className="game-title">Tic Tac Toe</h1>
          <p className="game-subtitle">
            The classic game of Xs and Os! Beat your opponent.
          </p>
        </div>

        <button onClick={onStart} className="start-button">
          ▶️ Play Now
        </button>
      </div>
    </div>
  );
}

export default TicTacToeStart;
