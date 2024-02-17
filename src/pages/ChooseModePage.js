import React from 'react';

const ChooseModePage = ({ setCurrentMode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-10">Choose Your Game Mode</h2>
      <div className="space-y-4">
        {/* Creative Mode Button */}
        <button
          onClick={() => setCurrentMode('creative')}
          className="bg-white text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-64 h-24 flex flex-col justify-center items-center">
          <span className="text-lg">Creative</span>
          <span className="text-sm">Choose your own adventure where every story continuation uses the vocab word correctly.</span>
        </button>

        {/* Test Mode Button */}
        <button
          onClick={() => setCurrentMode('test')}
          className="bg-white text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-64 h-24 flex flex-col justify-center items-center">
          <span className="text-lg">Test</span>
          <span className="text-sm">Only one story continuation uses the vocab word correctly.</span>
        </button>

        {/* Mixed Mode Button */}
        <button
          onClick={() => setCurrentMode('mixed')}
          className="bg-white text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-64 h-24 flex flex-col justify-center items-center">
          <span className="text-lg">Mixed</span>
          <span className="text-sm">At least 1 of the story continuations use the vocab word correctly.</span>
        </button>
      </div>
    </div>
  );
};

export default ChooseModePage;
