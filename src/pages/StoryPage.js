import React, { useState, useEffect, useRef } from 'react';
import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import vocabWords from '../components/VocabWords';

const StoryPage = ({ userDetails }) => {
  const [story, setStory] = useState('');
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const endOfStoryRef = useRef(null); // Create a ref for scrolling
  const isMounted = useRef(false); // Track the initial mount


  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      let response = await fetch('/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story, option: selectedOption }),
      });
      if (!response.ok) {
        // Simulate a response for demonstration
        response = {
          json: async () => ({
            newStoryPart: 'John strolled into the quaint corner store, his footsteps echoing against the polished linoleum floor. With a casual glance around, he spotted a shiny, crimson apple nestled among a pile of fresh produce. Grasping it gently, he felt the smooth skin beneath his fingertips, imagining the crisp, juicy bite to come. As he approached the checkout counter, a faint smile tugged at the corners of his lips, a simple pleasure found in the ordinary act of buying fruit. With a friendly nod to the cashier, he exchanged a few coins for his prize, savoring the anticipation of his next snack.',
            // Assuming your response structure here
            newOptions: [
              { text: 'Eat the apple' },
              { text: 'Put the ball in his bag.' },
              { text: 'Play with a cat.' },
            ],
          }),
        };
      }

      const { newStoryPart, newOptions } = await response.json();
      setStory(prev => prev + ' ' + newStoryPart);
      setOptions(newOptions);
    } catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchStoryContinuation();
      isMounted.current = true; // Mark as mounted after first effect runs
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once despite React Strict Mode

  useEffect(() => {
    // Scroll to the bottom of the page when options are updated
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [options]);

  const handleOptionSelect = (option) => {
    fetchStoryContinuation(option.text);
    setStory(prev => prev + '\n\n' + option.text + '\n\n');
    // Keep track of used vocab words
    const vocabWordsForUser = vocabWords[userDetails.grade].map(({ word }) => word);
    const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace('.', '').replace(',', '').replace('!', '').replace('?', '')));
    const usedVocabWithoutPunctuation = usedVocab.map(word => word.replace('.', '').replace(',', '').replace('!', '').replace('?', ''));
    setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);
  };

  return (
    <div className="flex">
      <div className="w-1/3">
        <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords[userDetails.grade]} />
      </div>
      <div className="w-2/3 p-4">
        <p>{story.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
        <AdventureOptions options={options} onOptionSelect={handleOptionSelect} userDetails={userDetails} />
        {/* This element is used as an anchor for scrolling */}
        <div ref={endOfStoryRef} />
      </div>
    </div>
  );
};

export default StoryPage;
