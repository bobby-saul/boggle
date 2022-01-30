import React, { useState } from "react";
import boggleDie from '../die.json';
import Die from "./Die";
import Timer from "./Timer";
import Score from "./Score";

const MIN_WORD_LENGTH = 3;
const COLUMN_SIZE = 4;

const Boggle = () => {
  const [dieOrder, setDieOrder] = useState(boggleDie.die);
  const [createdTime, setCreatedTime] = useState(new Date().getTime());
  const [currentWord, setCurrentWord] = useState([]);
  const [words, setWords] = useState([]);

  const newGame = () => {
    const newOrder = [];
    dieOrder.forEach(die => {
      newOrder.splice(Math.floor(Math.random() * newOrder.length), 0, die);
    });
    setDieOrder(newOrder);
    setCreatedTime(new Date().getTime());
    setWords([]);
    setCurrentWord([]);
  };

  const addCurrentWord = () => {
    const word = currentWord.map(letter => letter.value).join('');
    if (word.length >= MIN_WORD_LENGTH && words.indexOf(word) < 0) {
      setWords([...words, word]);
    }
  }

  const dieClick = (index, value) => {
    const lastClicked = currentWord[currentWord.length - 1]?.index;
    // if last letter in current word is what is clicked
    if (index === lastClicked) {
      // 1. add current word to words
      addCurrentWord();
      // 2. clear current word
      setCurrentWord([]);
      return;
    }

    // if letter already clicked and not last ignore
    if (currentWord.filter(letter => letter.index === index).length > 0) {
      console.log('already clicked');
      return;
    }

    // if can be clicked add to current word
    let validClick = false;
    switch (lastClicked % COLUMN_SIZE) {
      // First row
      case 0:
        if (
          lastClicked + 1 === index ||
          lastClicked + 4 === index ||
          lastClicked + 5 === index ||
          lastClicked - 3 === index ||
          lastClicked - 4 === index
        ) {
          validClick = true;
        }
        break;
      case 1:
      case 2:
        if (
          lastClicked + 1 === index ||
          lastClicked + 3 === index ||
          lastClicked + 4 === index ||
          lastClicked + 5 === index ||
          lastClicked - 1 === index ||
          lastClicked - 3 === index ||
          lastClicked - 4 === index ||
          lastClicked - 5 === index
        ) {
          validClick = true;
        }
        break;
      case 3:
        if (
          lastClicked - 1 === index ||
          lastClicked - 4 === index ||
          lastClicked - 5 === index ||
          lastClicked + 3 === index ||
          lastClicked + 4 === index
        ) {
          validClick = true;
        }
        break;
      default:
        // First click
        validClick = true;
        break;
    }
    if (validClick) {
      setCurrentWord([...currentWord, { index, value }]);
    }
  };

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
              return <Die
                key={index}
                createdTime={createdTime}
                index={index}
                sides={die}
                currentWord={currentWord}
                dieClick={dieClick}
              />;
            })}
          </div>
          <button className="Button" onClick={newGame}>New Game</button>
        </div>
        {/* Score */}
        <div className="BoggleContainer-Score">
          <Score words={words} currentWord={currentWord} />
        </div>
      </div>
    </div>
  )
}

export default Boggle;