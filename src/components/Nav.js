import React from 'react';

const Nav = ({ setCurrentPage }) => {
  return (
    <div className="flex justify-between items-center px-10 py-4" style={{ backgroundColor: '#c7dffb', position: 'fixed', width: '100%' }}>
      <img src={`${process.env.PUBLIC_URL}/images/voba-title-blue.png`} alt="Logo" className="h-20" />
      <div className="space-x-4">
        <button
          onClick={() => setCurrentPage('vocab')}
          className="bg-orange-500 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-orange-600 text-lg">
          Vocab
        </button>
        <button
          onClick={() => setCurrentPage('story')}
          className="bg-orange-500 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-orange-600 text-lg">
          Story
        </button>
      </div>
    </div>
  );
};

export default Nav;
