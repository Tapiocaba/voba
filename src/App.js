import React, { useState } from 'react';
import Nav from './Nav';
import Vocab from './Vocab';
import Story from './Story';

const App = () => {
  const [currentPage, setCurrentPage] = useState('vocab'); // 'vocab' or 'story'
  const [vocabWords, setVocabWords] = useState([]);

  const handleVocabSelection = (selectedWords) => {
    setVocabWords(selectedWords);
    setCurrentPage('story');
  };

  return (
    <div>
      <Nav setCurrentPage={setCurrentPage} />
      {currentPage === 'vocab' && <Vocab onVocabSelection={handleVocabSelection} />}
      {currentPage === 'story' && <Story vocabWords={vocabWords} />}
    </div>
  );
};

export default App;
