import React, { useEffect, useState } from 'react';

const Die = ({ createdTime, index, sides, currentWord, dieClick }) => {
  const [value, setValue] = useState(sides[Math.floor(Math.random() * sides.length)]);

  const selectedOrder = currentWord.findIndex(letter => letter.index === index);

  useEffect(() => {
    setValue(sides[Math.floor(Math.random() * sides.length)]);
  }, [createdTime]);

  return (
    <button
      className={`Die ${selectedOrder > -1 ? 'active' : ''}`}
      onClick={() => { dieClick(index, value) }}
    >
      {value}
      {selectedOrder > -1 && (
        <span className='selected-order'>{selectedOrder + 1}</span>
      )}
    </button>
  );
}

export default Die;