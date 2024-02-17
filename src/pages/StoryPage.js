import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import vocabWords from '../components/VocabWords';
import '../StoryPage.css';

const StoryPage = ({ userDetails, mode }) => {
  const [storyParts, setStoryParts] = useState([]); // Changed to array to handle each part separately
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const endOfStoryRef = useRef(null);
  const isMounted = useRef(false);

  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      let response = await fetch('/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story: storyParts.join(' '), option: selectedOption }),
      });
      if (!response.ok) {
        // response = {/* Simulated response for demonstration */ };
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
      }

      const { newStoryPart, newOptions } = await response.json();
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
  }, []);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [options]);

  const handleOptionSelect = (option) => {
    fetchStoryContinuation(option.text);
    setStoryParts(prev => [...prev, `\n${option.text}\n`]);
    const vocabWordsForUser = vocabWords[userDetails.grade].map(({ word }) => word);
    const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace(/[.,!?]/g, '')));
    const usedVocabWithoutPunctuation = usedVocab.map(word => word.replace(/[.,!?]/g, ''));
    setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);
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
