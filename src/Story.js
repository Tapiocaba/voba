import React, { useState, useEffect } from 'react';
import AdventureOptions from './AdventureOptions';
import VocabChecklist from './VocabChecklist';

const Story = ({ vocabWords }) => {
  const [story, setStory] = useState('');
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);

  // Mock function to fetch story continuation and options from OpenAI
  const fetchStoryContinuation = async (selectedOption = '') => {
    // Here, you'd send a request to your backend or serverless function that
    // communicates with OpenAI's API, passing the current story and selected option.
    // This example just simulates a response.

    // Simulated API response with new story part and options
    const newStoryPart = `After choosing to ${selectedOption}, our hero finds themselves in a new dilemma.`; // Replace with OpenAI response
    const newOptions = [
      { text: 'Option 1 using vocab word', vocab: 'Word1' },
      { text: 'Option 2 using vocab word', vocab: 'Word2' },
      { text: 'Option 3 using vocab word', vocab: 'Word3' },
    ]; // Replace with dynamically generated options using vocab words

    setStory(prev => prev + ' ' + newStoryPart);
    setOptions(newOptions);
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
