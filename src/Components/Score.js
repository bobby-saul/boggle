import React, { useState } from 'react';

const Score = ({ words, currentWord }) => {
  const [checkedWords, setCheckWords] = useState(sessionStorage.getItem('words') ? JSON.parse(sessionStorage.getItem('words')) : {});
  let score = 0;
  let wordCount = 0;

  words.map(word => {
    if (checkedWords[word] && checkedWords[word] === 't') {
      score += word.length;
      wordCount += 1;
    }
  });

  const checkWord = (word) => {
    if (checkedWords[word] === undefined) {
      // Set to pending
      const localWords = sessionStorage.getItem('words') ? JSON.parse(sessionStorage.getItem('words')) : {}
      localWords[word] = 'pending';
      sessionStorage.setItem('words', JSON.stringify(localWords));
      setCheckWords(localWords);

      // Fetch the definition
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
          // 404 means the word does not exist
          if (response.status === 404) {
            const localWords = sessionStorage.getItem('words') ? JSON.parse(sessionStorage.getItem('words')) : {}
            localWords[word] = 'f';
            sessionStorage.setItem('words', JSON.stringify(localWords));
            setCheckWords(localWords);
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            let valid = false;
            data.map(item => {
              // if we find our word we know it is good
              if (item.word === word) {
                valid = true;
              }
            });
            const localWords = sessionStorage.getItem('words') ? JSON.parse(sessionStorage.getItem('words')) : {}
            localWords[word] = valid ? 't' : 'f';
            sessionStorage.setItem('words', JSON.stringify(localWords));
            setCheckWords(localWords);
          }
        })
        .catch((e) => {
          // Just logging any errors
          console.log(e);
        });
    }
    return checkedWords[word] ? checkedWords[word] : 'pending';
  }

  return (
    <div className='Score'>
      {/* Current Word */}
      <div className='Score-CurrentWord'>{currentWord.map(letter => letter.value).join('')}</div>
      {/* Score */}
      <div className='Score-Words'>
        <strong>Words</strong> <span>({wordCount}/{score}pts)</span>
        <ul className='Score-Words-Content'>
          {words.map(word => {
            return (
              <li key={word}>
                <span className={checkWord(word)}>{word}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Score;