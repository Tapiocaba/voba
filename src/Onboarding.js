import React, { useState } from 'react';

const Onboarding = ({ onOnboardingComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleNext = () => {
    if (step === 1 && name) {
      setStep(step + 1);
    } else if (step === 2 && grade) {
      onOnboardingComplete(name, grade);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg">
        {step === 1 && (
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 text-center">What's your name?</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-3/4 mx-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <label htmlFor="grade" className="block text-lg font-medium text-gray-700 text-center">What's your grade level?</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 block w-3/4 mx-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select your grade</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
        >
          {step === 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
