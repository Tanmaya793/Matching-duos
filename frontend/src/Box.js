import React from "react";

const Box = ({ value, onClick, revealed }) => {
  return (
    <button className="box" onClick={onClick} disabled={revealed}>
      {revealed ? value : ""}
    </button>
  );
};

export default Box;
