import React, { useState, useEffect } from 'react';
import AdventureOptions from './AdventureOptions';
import VocabChecklist from './VocabChecklist';

const Story = ({ vocabWords }) => {
  const [story, setStory] = useState('');
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);

  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      const response = await fetch('/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story, option: selectedOption }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { newStoryPart, newOptions } = await response.json();

      setStory(prev => prev + ' ' + newStoryPart);
      setOptions(newOptions);
    } catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  };


  useEffect(() => {
    fetchStoryContinuation();
  }, []);

  const handleOptionSelect = (option) => {
    fetchStoryContinuation(option.text);
    setUsedVocab([...usedVocab, option.vocab]);
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords} />
      </div>
      <div className="w-2/3 p-4">
        <p>{story}</p>
        <AdventureOptions options={options} onOptionSelect={handleOptionSelect} />
      </div>
    </div>
  );
};

export default Story;
