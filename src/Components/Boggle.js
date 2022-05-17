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
  const [showHelp, setShowHelp] = useState(false);

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

  const undo = () => {
    setCurrentWord(currentWord.slice(0, -1));
  }

  const clearWord = () => {
    setCurrentWord([]);
  }

  const submitWord = () => {
    // 1. add current word to words
    addCurrentWord();
    // 2. clear current word
    setCurrentWord([]);
  }

  return (
    <div className="BoggleContainer">
      <h1>Boggle</h1>
      {/* Container */}
      <div className="BoggleContainer-Content">
        <button className="Button" onClick={newGame}>Shake Board</button>
        <button className="Button" onClick={() => setShowHelp(true)}>Help</button>
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
        </div>

        <div>
          <button className="Button" onClick={undo}>Undo</button>
          <button className="Button" onClick={clearWord}>Clear Word</button>
          <button className="Button" onClick={submitWord}>Submit Word</button>
        </div>
        {/* Score */}
        <div className="BoggleContainer-Score">
          <Score words={words} currentWord={currentWord} />
        </div>
      </div>
      {showHelp && (
        <div className="Help-Modal">
          <div className="Help-Content">
            <h2>Instructions</h2>
            <p>Click 'Shake Board' to mix up the letters and start a new game.</p>
            <p>You can adjust the timer by entering in the input next to 'Seconds'. Then you can start the timer by clicking 'Start Timer'. Clicking the button 'Stop Timer' will stop the timer. The button labeled 'Reset Timer' will stop the timer and set the time to the last adjusted time.</p>
            <p>The goal of the game is to get the most points for a given game board. Points are awarded for each letter used inside an accepted word. To select a word, tap the letters in the order that make up the word. Letters must be connected adjacent or diagonal to the last selected letter. Each letter can only be used once per word and words must be at least three letters long. To finish entering a word you can either click the last letter again or click the 'Submit Word' button.</p>
            <p>The 'Undo' button will remove the last selected letter from the current word. The 'Clear Word' button will remove all letters from being selected without entering the word to be counted.</p>
            <p>All submitted words are listed at the bottom. Accepted words will be highlighted in blue, and unaccepted words will be crossed out. Words that fail to checked properly will have a question mark next to them.</p>
            <p>The score will show the number of words / the number of characters for each point.</p>
            <button className="Button" onClick={() => setShowHelp(false)}>Okay</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Boggle;