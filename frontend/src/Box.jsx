import React from "react";

const Box = ({ value, onClick, revealed }) => {
  return (
    <div className="box-card">
      <div
        className={`box-inner ${revealed ? "flipped" : ""}`}
        onClick={!revealed ? onClick : undefined}
      >
        <div className="box-front"></div>
        <div className="box-back">{value}</div>
      </div>
    </div>
  );
};

export default Box;
