import React from 'react';

const Die = ({ sides }) => {
  const side = sides[Math.floor(Math.random() * sides.length)];

  return (
    <div className='Die'>{side}</div>
  );
}

export default Die;