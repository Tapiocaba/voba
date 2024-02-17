import React from 'react';
import vocabWords from './vocabWords';
import './Vocab.css'; // Assuming this is where your CSS lives

const AdventureOptions = ({ options, onOptionSelect, userDetails }) => {
  const renderTextWithVocab = (text, grade) => {
    const gradeVocab = vocabWords[grade] || [];
    const vocabMap = gradeVocab.reduce((acc, { word, definition }) => {
      acc[word.toLowerCase()] = definition; // Ensuring case-insensitive matching
      return acc;
    }, {});

    return text.split(' ').map((word, index) => {
      const key = `${index}-${word}`;
      const wordWithoutPunctuation = word.replace('.', '').replace(',', '').replace('!', '').replace('?', '');
      const definition = vocabMap[wordWithoutPunctuation.toLowerCase()];
      if (definition) {
        return (
          <span key={key} className="tooltip vocab-nobox" style={{ fontWeight: 'bold' }}>
            {`${word} `}
            <span className="tooltiptext">{definition}</span>
          </span>
        );
      }
      // For words without a matching vocab word, just return the word with a space.
      return `${word} `;
    });
  };

  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          className="block p-2 my-2 border-2 border-blue-500 text-blue-500 bg-white rounded"
          onClick={() => onOptionSelect(option)}
        >
          {/* Render the option text, potentially with vocab words highlighted and with tooltips */}
          {renderTextWithVocab(option.text, userDetails.grade)}
        </button>
      ))}
    </div>
  );
};

export default AdventureOptions;
