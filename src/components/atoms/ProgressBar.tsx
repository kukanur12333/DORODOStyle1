import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className="bg-yellow-400 h-1.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
