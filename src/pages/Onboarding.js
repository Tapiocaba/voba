import React, { useState } from 'react';

const OnboardingPage = ({ onOnboardingComplete }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [id, setId] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  const handleFinish = () => {
    if (!name && grade && id) {
      onOnboardingComplete(name, grade, id);
      setShowAlert(false); // Hide alert when all fields are filled
    } else {
      setShowAlert(true); // Show alert when any field is empty
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">

        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2" />
        </div>
        <div>
          <label htmlFor="grade" className="block text-lg font-medium text-gray-700 mb-2">Grade Level</label>
          <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2">
            <option value="">Select your grade</option>
            {Array.from({ length: 4 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="id" className="block text-lg font-medium text-gray-700 mb-2">ID Number</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2" />
        </div>
        <button onClick={handleFinish}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Finish
        </button>
      </div>
      {showAlert && (
        <div className="text-white px-6 py-2 border-0 rounded relative mb-4 bg-red-500">
          <span className="inline-block align-middle mr-8">
            Please fill out all fields before finishing.
          </span>
        </div>
      )}

    </div>
  );
};

export default OnboardingPage;
