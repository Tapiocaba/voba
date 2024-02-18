import React from 'react';
import '../css/FloatingCircles.css';

const FloatingCircles = () => {
  return (
    <div>
        <div className="floating-circles-container">
        {/* Circle Container 1 */}
        <div className="circle-container floating-animation delay-0 ">
            <div className="circle">
                <img src="https://static.vecteezy.com/system/resources/previews/024/996/737/original/pop-up-bubble-with-text-space-color-full-style-for-design-and-decoration-png.png" alt="Description 1" />
            </div>
            <p>Pop ups definitions for hovering over words</p>
        </div>

        {/* Circle Container 2 */}
        <div className="circle-container floating-animation delay-1">
            <div className="circle">
                <img src="https://developer.qualcomm.com/sites/default/files/audio_icon.jpg" alt="Description 1" />
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
            <img src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-graph-vector-icon-png-image_1028003.jpg" alt="Description 4"/>
            </div>
            <p>Word review tracking for visual progress progression</p>
        </div>
        </div> 
    </div>
  );
};

export default FloatingCircles;
