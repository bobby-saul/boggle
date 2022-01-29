import React, { useState, useEffect } from "react";
import boggleDie from '../die.json';
import Die from "./Die";
import Timer from "./Timer";

const Boggle = () => {
  const [dieOrder, setDieOrder] = useState(boggleDie.die);
  const [createdTime, setCreatedTime] = useState(new Date().getTime());

  const reorderDie = () => {
    const newOrder = [];
    dieOrder.forEach(die => {
      newOrder.splice(Math.floor(Math.random() * newOrder.length), 0, die);
    });
    setDieOrder(newOrder);
    setCreatedTime(new Date().getTime());
  };

  useEffect(reorderDie, []);

  return (
    <div className="BoggleContainer">
      <h1>Boggle</h1>
      {/* Container */}
      <div className="BoggleContainer-Content">
        {/* Timer */}
        <div className="BoggleContainer-Timer">
          <Timer createdTime={createdTime} />
        </div>
        {/* Game */}
        <div className="BoggleContainer-Game">
          <div className="Board">
            {dieOrder.map((die, index) => {
              return <Die key={index} sides={die} />;
            })}
          </div>
          <button className="Button" onClick={reorderDie}>Shake</button>
        </div>
        {/* Score */}
        <div className="BoggleContainer-Score">
        </div>
      </div>
    </div>
  )
}

export default Boggle;