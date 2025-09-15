import React, { useState, useEffect, useCallback } from "react";
import './TicTac.css';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function TicTacToe({ onQuit }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [mistakeDelay, setMistakeDelay] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [hasMadeMistake, setHasMadeMistake] = useState(false);

  const human = "X";
  const bot = "O";

  const checkWinner = useCallback((board) => {
  for (let [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}, []);

const checkDraw = useCallback((board) => board.every(cell => cell !== null), []);


  const minimax = useCallback((newBoard, depth, isMaximizing) => {
    let result = checkWinner(newBoard);
    if (result === bot) return 10 - depth;
    if (result === human) return depth - 10;
    if (checkDraw(newBoard)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = bot;
          let score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = human;
          let score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(bestScore, score);
        }
      }
      return bestScore;
    }
  }, [bot, human, checkWinner, checkDraw]);


  const botMove = useCallback(() => {
    const now = Date.now();
    if (!gameStartTime) setGameStartTime(now);

    for (let [a, b, c] of winningCombinations) {
      const line = [board[a], board[b], board[c]];
      if (line.filter(v => v === bot).length === 2 && line.includes(null)) {
        const winIndex = [a, b, c][line.indexOf(null)];
        const newBoard = [...board];
        newBoard[winIndex] = bot;
        setBoard(newBoard);
        setIsPlayerTurn(true);
        return;
      }
    }
    for (let [a, b, c] of winningCombinations) {
      const line = [board[a], board[b], board[c]];
      if (line.filter(v => v === human).length === 2 && line.includes(null)) {
        const blockIndex = [a, b, c][line.indexOf(null)];
        const newBoard = [...board];
        newBoard[blockIndex] = bot;
        setBoard(newBoard);
        setIsPlayerTurn(true);
        return;
      }
    }

    let possibleMoves = [];
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        let newBoard = [...board];
        newBoard[i] = bot;
        let score = minimax(newBoard, 0, false);
        possibleMoves.push({ index: i, score });
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    let moveToPlay = bestMove;
    if (!hasMadeMistake && mistakeDelay !== null && now - gameStartTime >= mistakeDelay) {
      const nonBestMoves = possibleMoves.filter(m => m.index !== bestMove);
      if (nonBestMoves.length > 0) {
        moveToPlay = nonBestMoves[Math.floor(Math.random() * nonBestMoves.length)].index;
        setHasMadeMistake(true);
      }
    }

    if (moveToPlay !== null) {
      const newBoard = [...board];
      newBoard[moveToPlay] = bot;
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  }, [board, bot, human, hasMadeMistake, mistakeDelay, gameStartTime, minimax]);

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = human;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }
    if (checkDraw(board)) {
      setIsDraw(true);
      return;
    }
    if (!isPlayerTurn) {
      const timer = setTimeout(botMove, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isPlayerTurn, botMove]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setIsDraw(false);
    setGameStartTime(null);
    setHasMadeMistake(false);
  };

  const startGameWithDifficulty = (level) => {
    setDifficulty(level);
    if (level === "easy") setMistakeDelay(8000);
    else if (level === "medium") setMistakeDelay(15000);
    else if (level === "hard") setMistakeDelay(30000);
  };

  if (!difficulty) {
    return (
      <div className="tic-tac-toe">
        <button className="back-to-hub-btn" onClick={onQuit}>
          ← Back to Home
        </button>
        <div className="difficulty-select">
          <h1>Choose Difficulty ⚙️</h1>
          <button onClick={() => startGameWithDifficulty("easy")}>Easy 🐣</button>
          <button onClick={() => startGameWithDifficulty("medium")}>Medium 🎯</button>
          <button onClick={() => startGameWithDifficulty("hard")}>Hard 💀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tic-tac-toe">
      <button className="back-to-hub-btn" onClick={onQuit}>
        ← Back to Home
      </button>
      <div className="container">
        <h1>TTT-bot ({difficulty.toUpperCase()} Mode)</h1>
        <div className="board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="square"
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="message">
          {winner ? `${winner} wins!` : isDraw ? "It's a draw!" : ""}
        </div>
        {(winner || isDraw) && (
          <div>
            <button className="restart-btn" onClick={restartGame}>Restart</button>
            <button className="change-btn" onClick={() => setDifficulty(null)}>Change Difficulty</button>
          </div>
        )}
      </div>
    </div>
  );
}
