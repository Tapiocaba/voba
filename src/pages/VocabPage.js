import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is used for dictionary API requests

import '../css/Vocab.css';



const VocabPage = ({ userDetails, onContinueToMode, vocabWords, onChangeVocabWords }) => {
  const [editMode, setEditMode] = useState(false);
  const [newWord, setNewWord] = useState('');

  const handleAudioClick = async (text) => {
    try {
      const params = { audio_str: text };
      const response = await axios.get(`http://localhost:8000/api/get_audio`, {
        params,
        responseType: 'blob',
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      });
      const audioUrlObject = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrlObject);
      audio.play();
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteWord = (index) => {
    const updatedWords = vocabWords.filter((_, idx) => idx !== index);
    onChangeVocabWords(updatedWords);
  };

  const handleNewWordSubmit = async (event) => {
    event.preventDefault();
    // Replace 'dictionary-lookup' with your actual dictionary library or API call
    const definition = await lookupDefinition(newWord);
    const updatedWords = [...vocabWords, { word: newWord, definition }];
    onChangeVocabWords(updatedWords);
    setNewWord('');
  };

  const lookupDefinition = async (word) => {
    try {
      // This is a placeholder for your dictionary lookup logic
      // Replace this with your actual API call or library usage
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.data[0].meanings[0].definitions[0].definition;
    } catch (error) {
      console.error('Error fetching definition:', error);
      return 'Definition not found.';
    }
  };

  return (
    <div>
      <button
        className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
        onClick={toggleEditMode}
      >
        {editMode ? 'Exit Teacher Mode' : 'Teacher Mode'}
      </button>
      <div className="flex items-center justify-center">

        <div className="p-4" style={{ maxWidth: 600 }}>

          {!editMode && (
            <div>
              <h2 className="text-xl font-bold mb-10 text-center">Hello, {userDetails.name}!</h2>
              <h2 className="text-xl font-bold text-center">Here are your vocab words (Grade {userDetails.grade}). </h2>
              <h2 className="text-lg mb-10 text-center">Click on a word to hear it spoken.</h2>
            </div>
          )}

          {editMode && (
            <h2 className="text-xl font-bold mb-10 text-center">Add or remove vocabulary words for {userDetails.name}</h2>
          )}


          {editMode && (
            <form className="mb-4 text-center" onSubmit={handleNewWordSubmit}>
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Enter new word"
                className="mr-2 py-2 px-4 rounded border-2 border-gray-300"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Add Word
              </button>
            </form>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {vocabWords.length > 0 ? (
              vocabWords.map((wordObj, index) => (
                <div key={index} className="vocab-box tooltip relative"
                  onClick={() => handleAudioClick(wordObj.word)}
                >
                  {editMode && (
                    <button
                      onClick={() => handleDeleteWord(index)}
                      className="absolute top-0 right-0 text-xl font-bold px-2 py-1"
                    >
                      ×
                    </button>
                  )}
                  {wordObj.word}
                  {!editMode && <span className="tooltiptext">{wordObj.definition}</span>}
                </div>
              ))
            ) : (
              <p>No vocabulary words available for this grade.</p>
            )}
          </div>
          <div className="text-center mt-8">
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={onContinueToMode}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabPage;
