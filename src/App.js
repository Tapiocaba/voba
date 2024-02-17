import React, { useState } from 'react';
import Onboarding from './pages/OnboardingPage';
import Nav from './components/Nav';
import VocabPage from './pages/VocabPage';
import StoryPage from './pages/StoryPage';
import LandingPage from './pages/LandingPage';
import './App.css';

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', grade: '', id: '' });
  const [currentPage, setCurrentPage] = useState('landing');

  const handleOnboardingComplete = (name, grade) => {
    setUserDetails({ name, grade });
    setOnboardingComplete(true);
    setCurrentPage('vocab'); // go to vocab once onboarding is complete
  };

  const handleContinueToStory = () => {
    setCurrentPage('story');
  };

  // Render LandingPage if currentPage is 'landing'
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
      {currentPage === 'vocab' && <VocabPage userDetails={userDetails} onContinueToStory={handleContinueToStory} />}
      {currentPage === 'story' && <StoryPage userDetails={userDetails} />}
    </div>
  );
};

export default App;
