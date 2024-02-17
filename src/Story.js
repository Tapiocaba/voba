import React from "react";
import { useLocation } from "react-router-dom";

function Story() {
  const location = useLocation();
  const { vocab } = location.state || { vocab: [] };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Story Page</h2>
      <p>This page will use the vocab words in a story. For now, here they are:</p>
      <ul>
        {vocab.map((word) => (
          <li key={word} className="list-disc list-inside">{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default Story;
