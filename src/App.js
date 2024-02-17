import React, { useState } from 'react';
import Onboarding from './pages/OnboardingPage';
import Nav from './components/Nav';
import VocabPage from './pages/VocabPage';
import StoryPage from './pages/StoryPage';
import LandingPage from './pages/LandingPage';
import ChooseModePage from './pages/ChooseModePage';
import './App.css';

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', grade: '', id: '' });
  const [currentPage, setCurrentPage] = useState('landing');
  const [mode, setMode] = useState('normal');

  const handleOnboardingComplete = (name, grade) => {
    setUserDetails({ name, grade });
    setOnboardingComplete(true);
    setCurrentPage('vocab'); // go to vocab once onboarding is complete
  };

  const handleContinueToMode = () => {
    setCurrentPage('chooseMode');
  };

  const setCurrentMode = (mode) => {
    setMode(mode);
    setCurrentPage('story');
  }

  // Render LandingPage if currsentPage is 'landing'
  if (currentPage === 'landing') {
    return <LandingPage setCurrentPage={setCurrentPage} />;
  }

  // Render Onboarding if onboarding is not complete
  if (!onboardingComplete) {
    return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
  }

  // Main app content
  return (
    <div>
      <Nav setCurrentPage={setCurrentPage} />
      <div style={{ padding: 100 }}>
        {currentPage === 'vocab' && <VocabPage userDetails={userDetails} onContinueToStory={handleContinueToMode} />}
        {currentPage === 'story' && <StoryPage userDetails={userDetails} mode={mode} />}
        {currentPage === 'chooseMode' && <ChooseModePage userDetails={userDetails} setCurrentMode={setCurrentMode} />}
      </div>
    </div>
  );
};

export default App;
