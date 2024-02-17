import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <Link to="/vocab" className="px-4 py-2 hover:bg-blue-700 rounded">Vocab</Link>
      <Link to="/story" className="px-4 py-2 hover:bg-blue-700 rounded">Story</Link>
    </nav>
  );
}

export default Nav;
