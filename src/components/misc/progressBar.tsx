"use client";
import { useEffect, useState } from "react";

const ProgressBar = ({ energy }: any) => {
  const [, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${energy}%` }}></div>
    </div>
  );
};

export default ProgressBar;
