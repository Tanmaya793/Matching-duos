import React from "react";
import MatrixGrid from "./MatrixGrid"; 
import './memory-match.css';

function Matching({ onQuit }) {
  return (
    <div className="matching-container">
      <MatrixGrid onQuit={onQuit} />
    </div>
  );
}

export default Matching;
