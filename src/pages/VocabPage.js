import React from 'react';
import VocabWords from '../components/VocabWords';
import '../css/Vocab.css';

const VocabPage = ({ userDetails, onContinueToStory }) => {
  const wordsForGrade = VocabWords[userDetails.grade];

  return (
    // Outer container for vertical centering
    <div className="flex items-center justify-center">
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onContinueToStory}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabPage;
