import React from 'react';

const Nav = ({ setCurrentPage }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white" style={{
      position: 'fixed', width: '100%'
    }}>
      <button onClick={() => setCurrentPage('vocab')} className="px-4 py-2 hover:bg-blue-700 rounded">Vocab</button>
      <button onClick={() => setCurrentPage('story')} className="px-4 py-2 hover:bg-blue-700 rounded">Story</button>
    </nav>
  );
};

export default Nav;
