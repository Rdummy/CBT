import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [pulsating, setPulsating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeRemaining === 11) {
      setPulsating(true);
    } else if (timeRemaining === 0) {
      setPulsating(false);
    }
  }, [timeRemaining]);

  const calculateMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    return (1 - timeRemaining / initialTime) * 100;
  };

  const determineColor = () => {
    if (pulsating) {
      return "red";
    } else if (timeRemaining <= initialTime / 2) {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <div
      id="timer-container"
      className={`countdown-timer-container ${pulsating ? "pulsate" : ""}`}
    >
      <svg className="timer-ring" width="100" height="100">
        {/* Gray ring representing the remaining time */}
        <circle
          className="ring-circle gray-ring"
          cx="50"
          cy="50"
          r="40"
          stroke="#ddd"
          strokeWidth="8"
          fill="transparent"
          style={{
            strokeDasharray: 251,
            strokeDashoffset: 0,
          }}
        />
        {/* Green ring representing the animated progress */}
        <circle
          className="ring-circle"
          cx="50"
          cy="50"
          r="40"
          stroke={determineColor()}
          strokeWidth="8"
          fill="transparent"
          style={{
            strokeDasharray: 251,
            strokeDashoffset: (calculateProgress() / 100) * 251,
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.5em"
          fill="#333"
        >
          {calculateMinutesAndSeconds(timeRemaining)}
        </text>
      </svg>
    </div>
  );
};

export default CountdownTimer;
