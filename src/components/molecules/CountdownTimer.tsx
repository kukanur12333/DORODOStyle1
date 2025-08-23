import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: Date;
}

const CountdownDisplay: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-3xl font-bold font-montserrat">{String(value).padStart(2, '0')}</span>
    <span className="text-xs uppercase tracking-wider">{label}</span>
  </div>
);

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft as { days: number; hours: number; minutes: number; seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex items-center gap-4 md:gap-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
      {timeLeft.days > 0 && <CountdownDisplay value={timeLeft.days} label="Days" />}
      <CountdownDisplay value={timeLeft.hours} label="Hours" />
      <CountdownDisplay value={timeLeft.minutes} label="Minutes" />
      <CountdownDisplay value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};
