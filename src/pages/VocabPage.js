import React from 'react';
import VocabWords from '../components/VocabWords';
import '../css/vocab.css';

const VocabPage = ({ userDetails, onContinueToStory }) => {
  const wordsForGrade = VocabWords[userDetails.grade];

  return (
    // Outer container for vertical centering
    <div className="flex items-center justify-center">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-10 text-center">Hello, {userDetails.name}!</h2>
        <h2 className="text-xl font-bold mb-10 text-center">Here are your vocab words (Grade {userDetails.grade}).</h2>
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
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
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
