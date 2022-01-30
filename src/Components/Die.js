import React, { useEffect, useState } from 'react';

const Die = ({ createdTime, index, sides, currentWord, dieClick }) => {
  const [value, setValue] = useState(sides[Math.floor(Math.random() * sides.length)]);

  const isActive = currentWord.filter(letter => letter.index === index).length > 0;

  useEffect(() => {
    setValue(sides[Math.floor(Math.random() * sides.length)]);
  }, [createdTime]);

  return (
    <button
      className={`Die ${isActive ? 'active' : ''}`}
      onClick={() => { dieClick(index, value) }}
    >
      {value}
    </button>
  );
}

export default Die;