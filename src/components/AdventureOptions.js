import React, { useState } from 'react';
import VocabWords from './VocabWords.js';
import '../css/vocab.css';

const AdventureOptions = ({ options, onOptionSelect, userDetails }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const renderTextWithVocab = (text, grade) => {
    const gradeVocab = VocabWords[grade] || [];
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
      return `${word} `;
    });
  };

  const handleOptionClick = (option, index) => {
    setSelectedOptionIndex(index); // Highlight the selected option
    onOptionSelect(option);
  };

  return (
    <div>
      {options.map((option, index) => {
        const isSelected = index === selectedOptionIndex;
        let borderColor = 'border-blue-500'; // Default border color
        if (isSelected) {
          borderColor = option.correct ? 'border-green-500' : 'border-red-500';
        }
        return (
          <button
            key={index}
            className={`block p-2 my-2 border-2 ${borderColor} text-blue-500 bg-white rounded`}
            onClick={() => handleOptionClick(option, index)}
          >
            {renderTextWithVocab(option.text, userDetails.grade)}
          </button>
        );
      })}
    </div>
  );
};

export default AdventureOptions;
