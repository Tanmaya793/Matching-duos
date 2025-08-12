import React from "react";
import '../../styles/start-screen.css';

function MemoryMatchStart({ onBack, onStart }) {
  return (
    <div className="start-screen">
        <button className="back-to-hub-btn" onClick={onBack}>
          ← Back to Game Hub
        </button>
      <div className="start-card">
        

        <div className="game-intro">
          <div className="game-icon">🧠</div>
          <h1 className="game-title">Memory Match Game</h1>
          <p className="game-subtitle">
            Flip the cards, find the pairs, and test your memory skills!
          </p>
        </div>

        <button onClick={onStart} className="start-button">
          ▶️ Play Now
        </button>
      </div>
    </div>
  );
}

export default MemoryMatchStart;
