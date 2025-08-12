import React from "react";
import TicTacToe from "./TicTac"; 

function TicTacToeGame({ onQuit }) {
  return <TicTacToe onQuit={onQuit} />;
}

export default TicTacToeGame;
