import React, { useState } from 'react';

import OnboardingPage from './pages/OnboardingPage';
import Nav from './components/Nav';
import VocabPage from './pages/VocabPage';
import StoryPage from './pages/StoryPage';
import LandingPage from './pages/LandingPage';
import ChooseModePage from './pages/ChooseModePage';
import VocabWords from './components/VocabWords';

import './css/App.css';

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', grade: '', id: '' });
  const [currentPage, setCurrentPage] = useState('landing');
  const [mode, setMode] = useState('creative');
  const [vocabWords, setVocabWords] = useState([]);

  const handleOnboardingComplete = (name, grade) => {
    setUserDetails({ name, grade });
    setOnboardingComplete(true);
    setVocabWords(VocabWords[grade]);
    setCurrentPage('vocab'); // go to vocab once onboarding is complete
  };

  const handleContinueToMode = () => {
    setCurrentPage('chooseMode');
  };

  const setCurrentMode = (mode) => {
    setMode(mode);
    setCurrentPage('story');
  }

  // Render LandingPage if currentPage is 'landing'
  if (currentPage === 'landing') {
    return <LandingPage setCurrentPage={setCurrentPage} />;
  }

  // Render Onboarding if onboarding is not complete
  if (!onboardingComplete) {
    return <OnboardingPage onOnboardingComplete={handleOnboardingComplete} />;
  }

  // Main app content
  return (
    <div>
      <Nav setCurrentPage={setCurrentPage} />
      <div style={{ paddingTop: 150, paddingLeft: 100, paddingRight: 100 }}>
        {currentPage === 'vocab' &&
          <VocabPage
            userDetails={userDetails}
            onContinueToMode={handleContinueToMode}
            vocabWords={vocabWords}
            onChangeVocabWords={(newWords) => {
              setVocabWords(newWords);
            }
            }
          />}
        {currentPage === 'story' && <StoryPage userDetails={userDetails} mode={mode} vocabWords={vocabWords} />}
        {currentPage === 'chooseMode' && <ChooseModePage userDetails={userDetails} setCurrentMode={setCurrentMode} />}
      </div>
    </div>
  );
};

export default App;
