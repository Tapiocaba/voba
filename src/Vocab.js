import React, { useState } from 'react';

const mockVocab = {
  "Grade 1": ["apple", "ball", "cat"],
  "Grade 2": ["dog", "elephant", "fish"],
  // Extend this list as needed
};

const Vocab = ({ onVocabSelection }) => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 1'); // Default or user-selected grade

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select a Grade Level:</h2>
      <div className="flex flex-wrap mb-4">
        {Object.keys(mockVocab).map((grade) => (
          <button
            key={grade}
            className={`mr-2 mb-2 px-4 py-2 ${selectedGrade === grade ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50`}
            onClick={() => setSelectedGrade(grade)}
          >
            {grade}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
        onClick={() => onVocabSelection(mockVocab[selectedGrade])}
      >
        Continue to Story
      </button>
    </div>
  );
};

export default Vocab;
