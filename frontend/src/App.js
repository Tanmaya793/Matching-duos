import React, { useState } from "react";
import GameHub from "./GameHub";

import MemoryMatchStart from "./games/Matching/MemoryMatchStart";
import MemoryMatchGame from "./games/Matching/MemoryMatchGame";
import TicTacToeStart from "./games/Tic-Tac-Toe/TicTacToeStart";
import TicTacToeGame from "./games/Tic-Tac-Toe/TicTacToeGame";


function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [started, setStarted] = useState(false);

  const backToHub = () => {
    setSelectedGame(null);
    setStarted(false);
  };

  const quitGame = () => {
    setStarted(false);
  };

  // HUB
  if (!selectedGame) {
    return <GameHub onSelectGame={setSelectedGame} />;
  }

  // START SCREEN
  if (!started) {
    if (selectedGame === "memory") {
      return <MemoryMatchStart onBack={backToHub} onStart={() => setStarted(true)} />;
    }
    if (selectedGame === "tic-tac-toe") {
      return <TicTacToeStart onBack={backToHub} onStart={() => setStarted(true)} />;
    }
  }

  // GAME SCREEN
  if (started) {
    if (selectedGame === "memory") {
      return <MemoryMatchGame onQuit={quitGame} />;
    }
    if (selectedGame === "tic-tac-toe") {
      return <TicTacToeGame onQuit={quitGame} />;
    }
  }

  return null;
}

export default App;
