import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import vocabWords from '../components/VocabWords';
import ElephantPopup from '../components/ElephantPopup';
import axios from 'axios';

import '../css/StoryPage.css';

const StoryPage = ({ userDetails, mode }) => {
  const [storyParts, setStoryParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [usedVocab, setUsedVocab] = useState([]);
  const [elephantText, setElephantText] = useState('Give me a second to think of a story...');
  const endOfStoryRef = useRef(null);
  const isMounted = useRef(false);

  const fetchStoryContinuation = async (selectedOption = '') => {
    try {
      let newStoryPart = '';
      let newOptions = [];

      // if story is empty, fetch the first part of the story
      if (storyParts.length === 0) {
        const requestUrl = `http://127.0.0.1:8000/api/get-initial-story`;

        try {
          const response = await axios.get(requestUrl, {
            params: {
              mode: mode,
              vocab_list: vocabWords[userDetails.grade].map(({ word }) => word).join(', '),
            },
            headers: {
              'Accept': 'application/json',
            },
          })
          newStoryPart = response.data;
        }
        catch (error) {
          console.error('Error fetching story continuation:', error);
        }


      }
      else {

        try {
          const requestUrl = `http://127.0.0.1:8000/api/get-story-continue`;

          const response = await axios.get(requestUrl, {
            params: {
              story: storyParts.join(' ') + ' ' + selectedOption,
              mode: mode,
              vocab_list: vocabWords[userDetails.grade].map(({ word }) => word).join(', '),
            },
            headers: {
              'Accept': 'application/json',
            },
          })
          newStoryPart = response.data;
        }
        catch (error) {
          throw new Error('Failed to fetch story continuation');
        }

      }

      try {
        const optionsResponse = await axios.get('http://127.0.0.1:8000/api/get-sentence-options', {
          params: {
            story: storyParts.join(' ') + ' ' + newStoryPart,
            vocab_list: vocabWords[userDetails.grade].map(({ word }) => word).join(', '),
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
      setStoryParts(prev => [...prev, newStoryPart]);
      setElephantText('Choose an option to continue the story!');

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
        fetchStoryContinuation(option.text);
        setStoryParts(prev => [...prev, `\n${option.text}\n`]);
        const vocabWordsForUser = vocabWords[userDetails.grade].map(({ word }) => word);
        const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.toLowerCase().replace(/[.,!?]/g, '')));
        const usedVocabWithoutPunctuation = usedVocab.map(word => word.toLowerCase().replace(/[.,!?]/g, ''));
        setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);
      }, 1000);

    } else {
      try {
        const vocabWordsForUser = vocabWords[userDetails.grade].map(({ word }) => word);
        const usedVocab = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.toLowerCase().replace(/[.,!?;]/g, '')));
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
          <VocabChecklist usedVocab={usedVocab} vocabWords={vocabWords[userDetails.grade]} />

          <ElephantPopup text={elephantText} />

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
            <div style={{ height: '300px' }}></div>
          </TransitionGroup>
        </div>
        <div ref={endOfStoryRef} />
        <div className="fixed-bottom">
          <div className="options-container">
            <AdventureOptions options={options} onOptionSelect={handleOptionSelect} userDetails={userDetails} />
          </div>
        </div>
      </div>

    </div >
  );
};

export default StoryPage;
