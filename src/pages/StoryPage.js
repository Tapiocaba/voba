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
  const [hasEnded, setHasEnded] = useState(false);
  const endOfStoryRef = useRef(null);
  const isMounted = useRef(false);


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
    const requestUrl = `https://voba.vercel.app/api/get_initial_story`;

    try {
      const params = new URLSearchParams({
        mode: mode,
        vocab_list: vocabWords.map(({ word }) => word).join(', '),
      });

      const response = await fetch(`${requestUrl}?${params}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      let newStoryParts = [...storyParts, ''];

      // Function to read the stream
      const read = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            setElephantText('Coming up with possible continuations...');
            fetchStoryOptions(newStoryParts);
            isMounted.current = true;
            return;
          }

          // Convert the Uint8Array to a string and update the state
          const textChunk = new TextDecoder().decode(value);
          newStoryParts[newStoryParts.length - 1] += textChunk;
          setStoryParts(newStoryParts);

          // Read the next chunk
          read();
        }).catch(error => {
          console.error('Stream reading failed:', error);
        });
      };

      // Start reading the stream
      read();
    } catch (error) {
      console.error('Error fetching story continuation:', error);
    }
  };

  const fetchStoryContinuation = async (parts, uniqueUsedVocab) => {
    try {
      const requestUrl = `https://voba.vercel.app/api/get_story_continue`;

      // Prepare URLSearchParams for the GET request
      const params = new URLSearchParams({
        story: parts.join('\n'),
        mode: mode,
        vocab_list: vocabWords.map(({ word }) => word).join(', '),
        conclude: uniqueUsedVocab.length === vocabWords.length,
      });

      const response = await fetch(`${requestUrl}?${params}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      let newStoryParts = [...parts, ''];

      // Function to read the stream
      const read = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            if (uniqueUsedVocab.length === vocabWords.length) {
              setHasEnded(true);
              setElephantText('The end!');
              return;
            }
            setElephantText('Coming up with possible continuations...');
            fetchStoryOptions(newStoryParts);
            return
          }

          // Convert the Uint8Array to a string and update the state
          const textChunk = new TextDecoder().decode(value);
          newStoryParts[newStoryParts.length - 1] += textChunk;
          setStoryParts(newStoryParts);

          // Read the next chunk
          read();
        }).catch(error => {
          console.error('Stream reading failed:', error);
        });
      };

      // Start reading the stream
      read();
    } catch (error) {
      console.error('Failed to fetch story continuation', error);
      throw new Error('Failed to fetch story continuation');
    }
  };

  const fetchStoryOptions = async (parts) => {
    let newOptions = [];

    try {
      const optionsResponse = await axios.get(`https://voba.vercel.app/api/get_sentence_options`, {
        params: {
          story: parts.join('\n'),
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


  useEffect(() => {
    if (!isMounted.current) {
      fetchFirstPart();
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
      setTimeout(async () => {
        setElephantText('Give me a second to continue the story...');
        setOptions([]);
        const vocabWordsForUser = vocabWords.map(({ word }) => word);
        const usedVocabInSentence = option.text.split(' ').filter(word => vocabWordsForUser.includes(word.replace(/[.,!?]/g, '')));
        const usedVocabWithoutPunctuation = usedVocabInSentence.map(word => word.replace(/[.,!?]/g, ''));
        setUsedVocab(prev => [...prev, ...usedVocabWithoutPunctuation]);

        // create usedVocab list with unique values
        const uniqueUsedVocab = [...new Set(usedVocabWithoutPunctuation), ...new Set(usedVocab)];

        const parts = [...storyParts, option.text];
        setStoryParts(prev => [...prev, option.text]);
        fetchStoryContinuation(parts, uniqueUsedVocab);
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
          const fetchExplanation = async () => {
            const requestUrl = `https://voba.vercel.app/api/explain_why_wrong`;

            // Prepare URLSearchParams for the GET request
            const params = new URLSearchParams({
              sentence: option.text,
              word: word,
            });

            try {
              const response = await fetch(`${requestUrl}?${params}`, {
                headers: {
                  'Accept': 'application/json',
                },
              });

              // Check if the response is OK
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const reader = response.body.getReader();
              let elephantText = '';

              // Function to read the stream
              const read = () => {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    setElephantText(elephantText);
                    return;
                  }

                  // Convert the Uint8Array to a string
                  elephantText += new TextDecoder().decode(value);
                  setElephantText(elephantText);

                  // Read the next chunk
                  read();
                }).catch(error => {
                  console.error('Stream reading failed:', error);
                });
              };

              // Start reading the stream
              read();
            } catch (error) {
              console.error('Failed to fetch explanation', error);
              throw new Error('Failed to fetch explanation');
            }
          };
          fetchExplanation();
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
                    <br />
                  </React.Fragment>
                ))}</p>
              </CSSTransition>
            ))}
            {hasEnded && (
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
