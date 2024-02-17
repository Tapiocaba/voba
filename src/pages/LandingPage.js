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

      {/* Highlights Section */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-center">Welcome to Voba</h1>
        <p className="text-xl text-center max-w-md">
            Where Learning Meets Adventure!
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
            <h3 className="font-semibold text-lg">Embark on a Vocabulary Adventure!</h3>
            <p>
                With Voba, experience the magic of learning new words through AI-driven adventures. 
                Transform how you learn with stories that adapt to the words you need to master.
            </p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Create, Choose, Learn!</h3>
            <p>
                Features a choose-your-own-adventure format invites you into stories where your choices build the narrative. 
                It's not just about memorizing; it's about applying what you learn in context!
            </p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Learning Without Limits.</h3>
            <p>
                Voba goes where you go. Whether on a tablet at home or a computer in the classroom, our platform's adaptive interface ensures your learning adventure is always at your fingertips. 
            </p>
          </div>
          <div className="highlight p-4 shadow-lg rounded-lg bg-white">
            <h3 className="font-semibold text-lg">Your Imagination, Your World.</h3>
            <p>
                In Voba, every word is a building block for new worlds. Whether it's with pre-defined words or your own, the power of vocabulary opens endless possibilities. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
