import React from 'react';

const Nav = ({ setCurrentPage }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white" style={{
      position: 'fixed', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img src={`${process.env.PUBLIC_URL}/images/voba-title-blue.png`} alt="Logo" className="h-20" />
      <div>
        <button onClick={() => setCurrentPage('vocab')} className="px-4 py-2 hover:bg-gray-700 rounded transition duration-300 ease-in-out text-lg">Vocab</button>
        <button onClick={() => setCurrentPage('story')} className="px-4 py-2 hover:bg-gray-700 rounded transition duration-300 ease-in-out text-lg">Story</button>
      </div>
    </nav>
  );
};

export default Nav;
