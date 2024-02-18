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
    <div>
      <h2 className="highlights-title slide-up text-center"> Built with a Variety of Game Modes</h2>
      <div className="game-modes-container">
        <div className="game-modes-left">
          {gameModes.map((mode, index) => (
            <div key={index} className={`game-mode-cloud ${mode.class}`}>
              <h2><b>{mode.title}</b></h2>
              <p>{mode.description}</p>
            </div>
          ))}
        </div>
        <div className="game-modes-right">
          <img src={`${process.env.PUBLIC_URL}/images/vovo-sitting.png`} alt="Happy Elephant" />
        </div>
      </div>
    </div>
  );
}

export default LandingGameModes;
