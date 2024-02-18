import React, { useState } from 'react';
import VocabWords from '../components/VocabWords';
import '../css/vocab.css';

const VocabPage = ({ userDetails, onContinueToStory }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const wordsForGrade = VocabWords[userDetails.grade];

  return (
    <div className="flex h-screen">
      {/* Left Side: List of Vocabulary Words */}
      <div className="overflow-auto w-1/2 p-4">
        <h2 className="text-xl font-bold mb-10 text-center">Vocabulary List (Grade {userDetails.grade})</h2>
        <div className="flex flex-col">
          {wordsForGrade.map((wordObj, index) => (
            <button
              key={index}
              className="mb-2 bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={() => setSelectedWord(wordObj)}
            >
              {wordObj.word}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Display Selected Word's Image and Definition */}
      <div className="w-1/2 p-4 flex flex-col items-center">
        {selectedWord ? (
          <>
            <img src={selectedWord.imageLink} alt={selectedWord.word} className="max-w-xs max-h-64 rounded-lg shadow-lg" />
            <p className="mt-4 text-l g px-20">{selectedWord.definition}</p>
          </>
        ) : (
          <p className="text-lg">Select a word to see its definition and image.</p>
        )}
      </div>
    </div>
  );
};

export default VocabPage;
