import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Vocab from "./Vocab";
import Story from "./Story";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/vocab" element={<Vocab />} />
          <Route path="/story" element={<Story />} />
          <Route path="/" element={<Vocab />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
