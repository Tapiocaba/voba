import React from 'react';

const VocabChecklist = ({ usedVocab, vocabWords }) => {
  return (
    <div className="p-4">
      <h3 className="font-bold">Vocabulary Checklist</h3>
      <ul>
        {vocabWords.map(({ word }) => (
          <li key={word} className={`${usedVocab.includes(word) ? 'text-green-500' : 'text-gray-500'}`}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default VocabChecklist;
