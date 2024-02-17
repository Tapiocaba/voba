import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Change this line

const mockVocab = {
  "Grade 1": ["apple", "ball", "cat"],
  "Grade 2": ["dog", "elephant", "fish"],
  // Add more grades and vocab as needed
};

function Vocab() {
  const [selectedVocab, setSelectedVocab] = useState([]);
  const navigate = useNavigate(); // Change this line

  const handleGradeSelect = (grade) => {
    setSelectedVocab(mockVocab[grade]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select a Grade Level:</h2>
      {Object.keys(mockVocab).map((grade) => (
        <button
          key={grade}
          className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handleGradeSelect(grade)}
        >
          {grade}
        </button>
      ))}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Vocab Words:</h3>
        <ul>
          {selectedVocab.map((word) => (
            <li key={word} className="list-disc list-inside">{word}</li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => navigate("/story", { state: { vocab: selectedVocab } })}
        >
          Continue to Story
        </button>
      </div>
    </div>
  );
}

export default Vocab;
