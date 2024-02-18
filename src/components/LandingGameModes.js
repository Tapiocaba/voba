import React from 'react';

import '../css/landing.css';

function LandingGameModes() {
  // Array of game modes to map through
  const gameModes = [
    {
      title: 'Creative Mode',
      description: 'Create a story with different words in an open-ended adventure.',
      class: 'creative'
    },
    {
      title: 'Test Mode',
      description: 'Challenge your vocabulary by picking the correct word usage.',
      class: 'test'
    },
    {
      title: 'Mixed Mode',
      description: 'Combine creativity and knowledge in this mixed challenge mode.',
      class: 'mixed'
    },
  ];

  return (
    <div className="game-modes-container">
      <div className="game-modes-left">
        {gameModes.map((mode, index) => (
          <div key={index} className={`game-mode-cloud ${mode.class}`}>
            <h3>{mode.title}</h3>
            <p>{mode.description}</p>
          </div>
        ))}
      </div>
      <div className="game-modes-right">
        <img src={`${process.env.PUBLIC_URL}/vovo-sitting.png`} alt="Happy Elephant" />
      </div>
    </div>
  );
}

export default LandingGameModes;
