import React from "react";
import Box from "./Box";

const Row = ({ row, values, onBoxClick, isRevealed }) => {
  return (
    <div className="row">
      {values.map((val, col) => (
        <Box
          key={col}
          value={val}
          onClick={() => onBoxClick(row, col)}
          revealed={isRevealed(row, col)}
        />
      ))}
    </div>
  );
};

export default Row;
