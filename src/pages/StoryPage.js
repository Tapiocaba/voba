import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AdventureOptions from '../components/AdventureOptions';
import VocabChecklist from '../components/VocabChecklist';
import ElephantPopup from '../components/ElephantPopup';
import axios from 'axios';
import { jsPDF } from "jspdf";


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

  const downloadStoryAsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20; // Define a margin for left and right
    const maxWidth = pageWidth - margin * 2; // Calculate the maximum width of the text
    let yPos = 20; // Starting Y position

    storyParts.forEach((part) => {
      // Split the text into lines that fit within the maxWidth
      const lines = doc.splitTextToSize(part, maxWidth);
      doc.text(lines, margin, yPos);

      // Calculate the Y position for the next part, adding 10 for margin between parts
      yPos += lines.length * 6; // Adjust line spacing based on your needs
      if (yPos >= doc.internal.pageSize.getHeight() - 20) { // Check if we need a new page
        doc.addPage();
        yPos = 10; // Reset Y position for the new page
      }
    });

    doc.save('story.pdf');
  };


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
      setElephantText('Coming up with possible continuations...');
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
    else if (storyParts.length !== concludeAt + 1) {
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
          setOptions(newOptions);
          setElephantText('Choose an option to continue the story!');
        }
        catch (error) {
          console.error('Error fetching sentence options:', error);
        }
      }
      fetchStoryOptions()

    }
    else {
      setElephantText('The end! Great job!');
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
          {
            mode === 'test' &&
            <h3 className="font-bold text-xl">📈 Test mode</h3>
          }
          {
            mode === 'creative' &&
            <h3 className="font-bold text-xl">🎨 Creative mode</h3>
          }
          {
            mode === 'mixed' &&
            <h3 className="font-bold text-xl">🔥 Mixed mode</h3>
          }
          <hr className="line" />
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
            {storyParts.length > concludeAt && (
              <button onClick={downloadStoryAsPDF} className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download mr-2" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  <path d="M8 0a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 8 0z" />
                </svg>
                Export as PDF
              </button>

            )}
            <div style={{ height: '400px' }}></div>
          </TransitionGroup>

          <div ref={endOfStoryRef} />

        </div>
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