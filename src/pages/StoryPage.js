import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import vocabWords from '../components/VocabWords';
import ElephantPopup from '../components/ElephantPopup';

import '../css/storyPage.css';

const StoryPage = ({ userDetails, mode }) => {
  const [storyParts, setStoryParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const [elephantText, setElephantText] = useState('What do you think the next part of the story should be? Choose an option below!');
  const endOfStoryRef = useRef(null);
  const isMounted = useRef(false);

  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      let newStoryPart = '';
      let newOptions = [];

      // if story is empty, fetch the first part of the story
      if (storyParts.length === 0) {
        // const response = await fetch('/get-initial-story', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to fetch initial story');
        // }

        // newStoryPart = await response.json();
        newStoryPart = 'Once upon a time, in a land far, far away...';
      }
      else {

        const response = await fetch('/get-story-continue', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ story: storyParts.join(' '), option: selectedOption }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch story continuation');
        }

        newStoryPart = await response.json();

      }

      // const optionsResponse = await fetch('/get-sentence-options', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ story: storyParts.join(' '), option: selectedOption, mode: mode }),
      // });

      // if (!optionsResponse.ok) {
      //   throw new Error('Failed to fetch sentence options');
      // }

      const optionsResponse = {
        ok: true,
        json: async () => {
          return [
            { text: 'Option 1', correct: true },
            { text: 'Option 2', correct: false },
            { text: 'Option 3', correct: false },
          ];
        }
      }

      newOptions = await optionsResponse.json();

      setStoryParts(prev => [...prev, newStoryPart]);
      setOptions(newOptions);

    } catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchStoryContinuation();
      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [options]);

  const handleOptionSelect = (option) => {
    if (option.correct) {
      setElephantText('Great job! You chose the right option!');
      fetchStoryContinuation(option.text);
      setStoryParts(prev => [...prev, `\n${option.text}\n`]);
      const vocabWordsForUser = vocabWords[userDetails.grade].map(({ word }) => word);
      const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace(/[.,!?]/g, '')));
      const usedVocabWithoutPunctuation = usedVocab.map(word => word.replace(/[.,!?]/g, ''));
      setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);
    } else {
      setElephantText('Oh no! That was the wrong choice. Try again!');
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3" >
        <div style={{ position: 'fixed' }}>
          <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords[userDetails.grade]} />
        </div>
      </div>
      <div className="w-2/3 p-4">
        <TransitionGroup component={null}>
          {storyParts.map((part, index) => (
            <CSSTransition key={index} timeout={1000} classNames="fade">
              <p>{part.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {line}
                  <br />
                </React.Fragment>
              ))}</p>
            </CSSTransition>
          ))}
          <div style={{ height: '300px' }}></div>
        </TransitionGroup>
        <div className="fixed-bottom">
          <ElephantPopup text={elephantText} />
          <div className="options-container">
            <AdventureOptions options={options} onOptionSelect={handleOptionSelect} userDetails={userDetails} />
          </div>
        </div>

        <div ref={endOfStoryRef} />
      </div>
    </div>
  );
};

export default StoryPage;
