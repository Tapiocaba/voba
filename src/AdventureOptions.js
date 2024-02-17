import React from 'react';

const AdventureOptions = ({ options, onOptionSelect }) => {
  return (
    <div>
      {options.map((option, index) => (
        <button key={index} className="block p-2 my-2 bg-blue-500 text-white rounded" onClick={() => onOptionSelect(option)}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default AdventureOptions;
