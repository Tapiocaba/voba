import React, { useState } from 'react';

const OnboardingPage = ({ onOnboardingComplete }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [id, setId] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleFinish = () => {
    if (name && grade && id) {
      onOnboardingComplete(name, grade, id);
      setShowAlert(false);
    } else {
      setShowAlert(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        {showAlert && (
          <div className={`fixed bottom-0 left-0 right-0 w-auto max-w-sm mx-auto mb-6 p-4 bg-red-200 border-red-400 text-red-700 rounded transition-all ease-in-out duration-500 ${showAlert ? 'opacity-100' : 'opacity-0'}`}>
            <span>Please fill out all fields before submitting.</span>
          </div>
        )}
        <img src={`${process.env.PUBLIC_URL}/voba-title-blue.png`} alt="Logo" className="h-20" />

        {/* Text submission options */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2" />
        </div>
        <div>
          <label htmlFor="id" className="block text-lg font-medium text-gray-700 mb-2">ID Number</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2" />
        </div>
        <div>
          <label htmlFor="grade" className="block text-lg font-medium text-gray-700 mb-2">Grade Level</label>
          <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2">
            <option value="">Select your grade</option>
            {Array.from({ length: 4 }, (_, i) => <option key={i} value={i + 1}>{`${i + 1}`}</option>)}
          </select>
        </div>
        <button onClick={handleFinish} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Finish
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
