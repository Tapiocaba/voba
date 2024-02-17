import React from 'react';
import '../css/elephantPopup.css';

// This is a simple functional component that accepts text and audioLink props
const ElephantPopup = ({ text, audioLink }) => {
  return (
    <div className="elephant-popup">
      <img src={`${process.env.PUBLIC_URL}/voba-icon.png`} alt="Logo" className="h-40" />
      <div className="speech-bubble">{text}</div>
      {/* <audio src={audioLink} controls>
        Your browser does not support the audio element.
      </audio> */}
    </div>
  );
};

export default ElephantPopup;
