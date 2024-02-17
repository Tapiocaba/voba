import React from 'react';

const LandingPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center px-10 py-4">
        <img src={`${process.env.PUBLIC_URL}/voba-title.png`} alt="Logo" className="h-20" />
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('onboarding')}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Log In
          </button>
          <button
            onClick={() => setCurrentPage('onboarding')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign Up
          </button>
        </div>
      </div>

      {/* Heading and Subtext */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Platform</h1>
        <p className="text-xl text-center max-w-md">
          Start your journey today! (placeholder)
        </p>
        <button
          onClick={() => setCurrentPage('onboarding')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Get Started
        </button>
      </div>

      {/* Highlights Section */}
      <div className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">AI-powered vocabulary learning</h3>
            <p>AI-powered vocabulary learning</p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Rich Combat System</h3>
            <p>Features a rich combat system with four playable classes, each with distinct skills and character customizations.</p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Play Anywhere</h3>
            <p>Play on any device, anywhere: the game offers a different layout and interface for desktop and mobile.</p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Multiple Worlds</h3>
            <p>Different worlds to progress through, some singleplayer and some multiplayer. You can even build your own.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
