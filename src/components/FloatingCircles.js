import React from 'react';
import '../css/FloatingCircles.css';

const FloatingCircles = () => {
  return (
    <div className="floating-circles-container">
      {/* Circle Container 1 */}
      <div className="circle-container floating-animation delay-0 ">
        <div className="circle">
          <img src="https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg" alt="Description 1"/>
        </div>
        <p>Pop ups definitions for hovering over words</p>
      </div>

      {/* Circle Container 2 */}
      <div className="circle-container floating-animation delay-1">
        <div className="circle">
          <img src="https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg" alt="Description 2"/>
        </div>
        <p>Audio for every sentence to grasp pronunciation and tone!</p>
      </div>

      {/* Circle Container 3 */}
      <div className="circle-container floating-animation delay-2">
        <div className="circle">
            <img src={`${process.env.PUBLIC_URL}/images/voba-icon.png`} alt="Logo" className="h-40" />
        </div>
        <p>Learn with Vovo - a companion to help you understand your answers!</p>
      </div>

      {/* Circle Container 4 */}
      <div className="circle-container floating-animation delay-3">
        <div className="circle">
          <img src="https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg" alt="Description 4"/>
        </div>
        <p>Word review tracking for visual progress progression</p>
      </div>
    </div>
  );
};

export default FloatingCircles;
