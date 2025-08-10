import React, { useState } from "react";

const Box = ({ value, onClick, revealed }) => {

  const [flipped, setFlipped] = useState(false);

  return (
    <button
      className={`box ${revealed ? "flipped" : ""}`}
      onClick={onClick}
      disabled={revealed}
    >
      <span className="box-front"></span>
      <span className="box-back">{value}</span>
    </button>
  );
};

export default Box;
