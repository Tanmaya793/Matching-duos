import React, { useEffect, useState } from "react";
import Row from "./Row";
import "./matrix.css";

const MatrixGrid = ({ onQuit }) => {
  const [matrix, setMatrix] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const values = [];
    for (let i = 1; i <= 8; i++) values.push(i, i);

    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    const newMatrix = [];
    for (let i = 0; i < 4; i++) {
      newMatrix.push(values.slice(i * 4, i * 4 + 4));
    }

    setMatrix(newMatrix);
    setRevealed([]);
    setMatched([]);
    setTime(0);
    setGameOver(false);
  };

  const handleBoxClick = (row, col) => {
    if (
      revealed.some((r) => r.row === row && r.col === col) ||
      matched.some((m) => m.row === row && m.col === col)
    ) {
      return;
    }

    const newRevealed = [...revealed, { row, col, value: matrix[row][col] }];
    setRevealed(newRevealed);

    if (newRevealed.length === 2) {
      const [first, second] = newRevealed;

      if (first.value === second.value) {
        setMatched((prev) => [...prev, first, second]);
        setRevealed([]);

        if (matched.length + 2 === 16) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setRevealed([]);
        }, 800);
      }
    }
  };

  const isRevealed = (row, col) =>
    revealed.some((b) => b.row === row && b.col === col) ||
    matched.some((b) => b.row === row && b.col === col);

  return (
  <div className="outer matrix-container">
    <h2 className="matrix-header">⏱ Time: {time}s</h2>

    {gameOver && (
      <h3 className="matrix-gameover">🎉 Game Over! Final Time: {time}s</h3>
    )}

    <div className="buttons-container">
      <button 
        onClick={resetGame} 
        className="restart matrix-btn"
      >
        🔁 Restart Game
      </button>

      <button 
        className="restart matrix-btn quit-btn" 
        onClick={onQuit}
      >
        ❌ Quit
      </button>
    </div>

    <div className="grid-wrapper">
      {matrix.map((rowVals, rowIndex) => (
        <Row
          key={rowIndex}
          row={rowIndex}
          values={rowVals}
          onBoxClick={handleBoxClick}
          isRevealed={isRevealed}
        />
      ))}
    </div>
  </div>
);

};

export default MatrixGrid;
