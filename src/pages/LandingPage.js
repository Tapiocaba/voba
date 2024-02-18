import React from 'react';

import Footer from '../components/Footer';
import LandingGameModes from '../components/LandingGameModes';

import '../css/landing.css';

const LandingPage = ({ setCurrentPage }) => {

  return (
    <div className="flex flex-col">
      {/* Background Section */}
      <div className="flex flex-col welcome-background h-[100vh] welcome-text-overlay parallax-background">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center px-10 py-4">
          <a href="/" className="h-20">
            <img src={`${process.env.PUBLIC_URL}/images/voba-title-blue.png`} alt="Logo" className="h-20" />
          </a>
          <div className="space-x-4">
            <button
              onClick={() => setCurrentPage('onboarding')}
              className="log-in-button font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-sky-500">
              Log In
            </button>
            <button
              onClick={() => setCurrentPage('onboarding')}
              className="sign-up-button font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-sky-500">
              Sign Up
            </button>
          </div>
        </div>
        
        {/* Welcome Message with Slide-up Animation */}
        <div className="flex-grow flex flex-col items-center space-y-5 slide-up justify-start pt-60">
        <h1 className="text-6xl font-bold text-center text-white welcome-text">Welcome to Voba!</h1>
        <p className="text-2xl text-center max-w-md text-white welcome-text">
            Where Learning Meets Adventure
          </p>
          <button
            onClick={() => setCurrentPage('onboarding')}
            className="get-started-button log-in-button mt-4 bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-6 rounded transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
      {/* Highlights Section */}
      <div className="highlights-section py-8">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <h2 className="highlights-title slide-up text-center">Discover the Fun of Reading!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Animated Highlight Boxes */}
            <div className="highlight p-6 shadow-2xl rounded-lg bg-pastel-pink text-center slide-in-from-bottom">
                <h3 className="font-semibold text-lg">Embark on a Vocabulary Adventure!</h3>
                <p>
                    Experience the magic of learning new words through AI-driven adventures. 
                    Transform how you learn with stories that adapt to the words you need to master.
                </p>
            </div>
            <div className="highlight p-6 shadow-2xl rounded-lg bg-pastel-green text-center slide-in-from-bottom">
                <h3 className="font-semibold text-lg">Create, Choose, Learn!</h3>
                <p>
                    Features a choose-your-own-adventure format invites you into stories where your choices build the narrative. 
                    It's not just about memorizing; it's about applying what you learn in context!
                </p>
            </div>
            <div className="highlight p-6 shadow-2xl rounded-lg bg-pastel-blue text-center slide-in-from-bottom">
                <h3 className="font-semibold text-lg">Learning Without Limits.</h3>
                <p>
                    Voba goes where you go. Whether on a tablet at home or a computer in the classroom, our platform's adaptive interface ensures your learning adventure is always at your fingertips. 
                </p>
            </div>
            <div className="highlight p-6 shadow-2xl rounded-lg bg-pastel-yellow text-center slide-in-from-bottom">
                <h3 className="font-semibold text-lg">Your Imagination, Your World.</h3>
                <p>
                    Every word is a building block for new worlds. Whether it's with pre-defined words or your own, the power of vocabulary opens endless possibilities. 
                </p>
            </div>

          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <LandingGameModes />
      </div>
      <div className="flex justify-center items-center">
        <img src={`${process.env.PUBLIC_URL}/images/divider.png`} alt="Divider" className="w-auto max-w-xs md:max-w-sm lg:max-w-lg" />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
