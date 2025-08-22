import React from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <span className="font-montserrat font-bold text-4xl md:text-5xl text-white">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-3 font-poppins text-sm md:text-base text-gray-300 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};
