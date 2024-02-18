import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import ElephantPopup from '../components/ElephantPopup';
import axios from 'axios';

import '../css/StoryPage.css';

const StoryPage = ({ userDetails, mode, vocabWords }) => {
  const [storyParts, setStoryParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const [elephantText, setElephantText] = useState('Give me a second to think of a story...');
  const endOfStoryRef = useRef(null);
  const isMounted = useRef(false);
  const [initialized, setInitialized] = useState(false);

  const concludeAt = 6;

  // fetch first part of the array
  const fetchFirstPart = async () => {
    const requestUrl = `http://127.0.0.1:8000/api/get-initial-story`;
    let newStoryPart = '';

    try {
      const response = await axios.get(requestUrl, {
        params: {
          mode: mode,
          vocab_list: vocabWords.map(({ word }) => word).join(', '),
        },
        headers: {
          'Accept': 'application/json',
        },
      })
      newStoryPart = response.data;
      setStoryParts(prev => [...prev, newStoryPart]);
      isMounted.current = true;
    }
    catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  }

  useEffect(() => {
    if (!isMounted.current) {
      fetchFirstPart();
      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newStoryPart = '';
    let newOptions = [];

    if (!initialized) {
      // Set the flag to true to indicate that initialization has occurred
      setInitialized(true);
      // Don't perform any action during the first render
    }
    else if (storyParts.length % 2 === 0) {
      const fetchStoryContinuation = async () => {
        try {
          const requestUrl = `http://127.0.0.1:8000/api/get-story-continue`;

          const response = await axios.get(requestUrl, {
            params: {
              story: storyParts.join(' '),
              mode: mode,
              vocab_list: vocabWords.map(({ word }) => word).join(', '),
              conclude: storyParts.length === concludeAt,
            },
            headers: {
              'Accept': 'application/json',
            },
          })
          newStoryPart = response.data;
          setStoryParts(prev => [...prev, newStoryPart]);
          setElephantText('Coming up with possible continuations...');
        }
        catch (error) {
          throw new Error('Failed to fetch story continuation');
        }
      }
      fetchStoryContinuation();
    } 
    else if (storyParts.length !== concludeAt) {
      const fetchStoryOptions = async () => {
        try {
          const optionsResponse = await axios.get('http://127.0.0.1:8000/api/get-sentence-options', {
            params: {
              story: storyParts.join(' '),
              vocab_list: vocabWords.map(({ word }) => word).join(', '),
              mode: mode,
            },
            headers: {
              'Accept': 'application/json',
            },
          });

          newOptions = Object.values(optionsResponse.data).map(option => ({
            text: option.text,
            isCorrect: option.isCorrect,
          }));
          // shuffle the options
          newOptions = newOptions.sort(() => Math.random() - 0.5);
        }
        catch (error) {
          console.error('Error fetching sentence options:', error);
        }
        setOptions(newOptions);
      }
      fetchStoryOptions();
      setElephantText('Choose an option to continue the story!');
    }
    // eslint-disable-next-line
  }, [storyParts]);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [options, storyParts]);

  const handleOptionSelect = async (option) => {
    if (option.isCorrect) {
      if (mode === 'test') {
        setElephantText('Great job!');
      }
      else {
        setElephantText('Nice choice!');
      }
      // wait 1 second and then 
      setTimeout(() => {
        setElephantText('Give me a second to continue the story...');
        setOptions([]);
        setStoryParts(prev => [...prev, `\n${option.text}\n`]);
        const vocabWordsForUser = vocabWords.map(({ word }) => word);
        const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace(/[.,!?]/g, '')));
        const usedVocabWithoutPunctuation = usedVocab.map(word => word.replace(/[.,!?]/g, ''));
        setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);
      }, 1000);

    } else {
      try {
        const vocabWordsForUser = vocabWords.map(({ word }) => word);
        const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace(/[.,!?]/g, '')));
        let word = '';
        if (usedVocab.length > 0) {
          word = usedVocab[0];
        }
        if (word !== '') {
          const response = await axios.get('http://127.0.0.1:8000/api/explain-wrong', {
            params: {
              sentence: option.text,
              word: word,
            },
            headers: {
              'Accept': 'application/json',
            },
          });
          setElephantText(response.data);
        }
        else {
          setElephantText('Try again!');
        }
      } catch (error) {
        console.error('Error fetching explanation:', error);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3" >
        <div style={{ position: 'fixed' }}>
          <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords} />
          <div className="fixed-bottom">
            <div className="options-container">
              <ElephantPopup text={elephantText} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <div style={{ marginLeft: 30 }}>
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
            <div style={{ height: '400px' }}></div>
            <div style={{ height: '400px' }}></div>
          </TransitionGroup>
        </div>
        <div ref={endOfStoryRef} />
        <div className="fixed-bottom">
          <div className="options-container">
            <AdventureOptions options={options} onOptionSelect={handleOptionSelect} userDetails={userDetails} vocabWords={vocabWords} />
          </div>
        </div>
      </div>

    </div >
  );
};

export default StoryPage;