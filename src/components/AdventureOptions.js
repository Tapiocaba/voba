import React, { useState } from 'react';
import VocabWords from './VocabWords.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import '../css/vocab.css';
import axios from 'axios';

const AdventureOptions = ({ options, onOptionSelect, userDetails }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleAudioClick = async (text) => {
    try {
      const params = { audio_str: text };
      const response = await axios.get('http://localhost:8000/api/get-audio', {
        params,
        responseType: 'blob'
      });
      const audioUrlObject = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrlObject);
      audio.play();
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };



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
          <div key={index} className="flex items-center space-x-2">
            <button
              className="text-blue-500 bg-transparent border-none p-2"
              onClick={() => handleAudioClick(option.sentence)}
              aria-label="Listen"
            >
              <FontAwesomeIcon icon={faVolumeUp} />
            </button>
            <button
              className={`flex-grow block p-2 my-2 border-2 ${borderColor} text-blue-500 bg-white rounded`}
              onClick={() => handleOptionClick(option, index)}
            >
              {renderTextWithVocab(option.text, userDetails.grade)}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AdventureOptions;
