import React from 'react';
import vocabWords from './vocabWords';
import './Vocab.css'; // Assuming you'll write CSS in this file

const Vocab = ({ userDetails, onContinueToStory }) => {
  const wordsForGrade = vocabWords[userDetails.grade];

  return (
    // Outer container for vertical centering
    <div className="flex items-center justify-center h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-10 text-center">Vocabulary Words for Grade {userDetails.grade}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {wordsForGrade.length > 0 ? (
            wordsForGrade.map((wordObj, index) => (
              <div key={index} className="vocab-box tooltip">
                {wordObj.word}
                <span className="tooltiptext">{wordObj.definition}</span>
              </div>
            ))
          ) : (
            <p>No vocabulary words available for this grade.</p>
          )}
        </div>
        <div className="text-center mt-8">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={onContinueToStory}
          >
            Continue to Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vocab;
