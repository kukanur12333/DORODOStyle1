import React from 'react';
import clsx from 'clsx';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  className,
  error,
  required = false,
  disabled = false,
  icon,
  endIcon,
}) => {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-montserrat mb-2">
          {label} {required && <span className="text-primary-red">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={clsx(
            'block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-200 font-poppins',
            icon && 'pl-10',
            endIcon && 'pr-10',
            error && 'border-primary-red focus:ring-red-500',
            disabled && 'bg-gray-100 cursor-not-allowed'
          )}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-primary-red font-poppins mt-1">{error}</p>
      )}
    </div>
  );
};
