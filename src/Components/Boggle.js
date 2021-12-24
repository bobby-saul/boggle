import React, { useState, useEffect } from "react";
import boggleDie from '../die.json';
import Die from "./Die";

const Boggle = () => {
  const [dieOrder, setDieOrder] = useState(boggleDie.die);

  const reorderDie = () => {
    const newOrder = [];
    dieOrder.forEach(die => {
      newOrder.splice(Math.floor(Math.random() * newOrder.length), 0, die);
    });
    setDieOrder(newOrder);
  };

  useEffect(reorderDie, []);

  return (
    <div className="BoggleContainer">
      <h1>Boggle</h1>

      <div className="Board">
        {dieOrder.map((die, index) => {
          return <Die key={index} sides={die} />;
        })}
      </div>

      <button onClick={reorderDie}>Shake</button>
    </div>
  )
}

export default Boggle;