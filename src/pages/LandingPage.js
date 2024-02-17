import React from 'react';

const LandingPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* nav bar */}
      <div className="flex justify-between items-center px-10 py-4">
        <div>Logo</div>
        <div className="space-x-4">
          <button
            onClick={() => console.log('Log In')}
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
      
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Platform</h1>
        <p className="text-xl text-center max-w-md">
          Start your journey today! (placeholer)
        </p>
        <button
          onClick={() => setCurrentPage('onboarding')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Get Started
        </button>
      </div>

    </div>
  );
};

export default LandingPage;
