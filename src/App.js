import React, { useState } from 'react';
import Onboarding from './Onboarding';
import Nav from './Nav';
import Vocab from './Vocab';
import Story from './Story';

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', grade: '' });
  const [currentPage, setCurrentPage] = useState('vocab');

  const handleOnboardingComplete = (name, grade) => {
    setUserDetails({ name, grade });
    setOnboardingComplete(true);
  };

  const handleContinueToStory = () => {
    setCurrentPage('story'); // Transition to the Story component
  };

  if (!onboardingComplete) {
    return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
  }

  return (
    <div>
      <Nav setCurrentPage={setCurrentPage} />
      {currentPage === 'vocab' && <Vocab userDetails={userDetails} onContinueToStory={handleContinueToStory} />}
      {currentPage === 'story' && <Story userDetails={userDetails} />}
    </div>
  );
};

export default App;
