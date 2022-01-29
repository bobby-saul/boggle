import React from 'react';

const Die = ({ sides }) => {
  const side = sides[Math.floor(Math.random() * sides.length)];

  return (
    <button className='Die'>{side}</button>
  );
}

export default Die;