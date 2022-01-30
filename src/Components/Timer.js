import React, { useEffect, useState } from 'react';

const Timer = ({ createdTime }) => {
  const [maxTime, setMaxTime] = useState(60);
  const [time, setTime] = useState(maxTime);
  const [isRunning, setIsRunning] = useState(false);
  const [downOneTimer, setDownOneTimer] = useState(null);

  const toggleTimer = () => {
    if (isRunning) {
      clearTimeout(downOneTimer);
    }
    setIsRunning(!isRunning);
  };

  const resetTime = () => {
    clearTimeout(downOneTimer);
    setTime(maxTime);
    setIsRunning(false);
  };

  const changeMax = (e) => {
    setMaxTime(e.target.value);
    setTime(e.target.value);
  };

  useEffect(() => {
    resetTime();
  }, [createdTime]);

  useEffect(() => {
    if (isRunning) {
      const downOne = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      if (time < 1) {
        console.log('Game over');
        clearTimeout(downOne);
        setIsRunning(false)
      } else {
        setDownOneTimer(downOne);
      }
    }
  }, [isRunning, time]);

  return (
    <div className='Timer'>
      <div className='Timer-Time'>
        {!isRunning && time === maxTime ? (
          <input
            type='number'
            value={maxTime}
            step={1}
            min={0}
            onInput={changeMax}
            style={{
              width: (maxTime.toString().length + 1.25) + 'ch',
            }}
          />
        ) : (
          <span>{time}</span>
        )}
        Second{time !== 1 ? 's' : ''}
      </div>
      <button className='Button' onClick={toggleTimer}>
        {isRunning ? 'Stop' : 'Start'} Timer
      </button>
      <button className='Button' onClick={resetTime}>
        Reset Timer
      </button>
    </div>
  );
}

export default Timer;