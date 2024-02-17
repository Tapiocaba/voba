import React, { useState } from 'react';
import Onboarding from './pages/Onboarding';
import Nav from './components/Nav';
import Vocab from './components/Vocab';
import Story from './components/Story';
import LandingPage from './pages/LandingPage';

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
      {currentPage === 'vocab' && <Vocab userDetails={userDetails} onContinueToStory={handleContinueToStory} />}
      {currentPage === 'story' && <Story userDetails={userDetails} />}
    </div>
  );
};

export default App;
