import React, { useState } from "react";
import taskImage from "../images/task.jpeg";  
import "../styles/Home.css";  // CSS file

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="home-container">
      <div className="home-left">
        <h1>Plan. Track. Achieve</h1>
        <p>
     Boost your productivity with seamless task management. Our platform helps you organize, prioritize, and track your tasks 
          effortlessly. Say goodbye to chaos and hello to efficiency!
        </p>

        <button 
          className="home-btn"
          onClick={() => setShowPopup(true)}
        >
          Learn More
        </button>
      </div>

      <div 
        className="home-right" 
        style={{ backgroundImage: `url(${taskImage})` }} // Use the imported image in the background
      ></div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
          <h2>About TaskMaster</h2>
            <p>
              <strong>TaskMaster</strong> is your go-to platform for organizing tasks, tracking progress, 
              and improving team collaboration. From task creation to status tracking, it’s all in one place. 
              Effortlessly assign tasks, monitor progress, and achieve your goals faster. Stay organized, stay productive.
            </p>

            <button 
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;