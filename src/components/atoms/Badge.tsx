import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'ai' | 'limited' | 'sale' | 'new' | 'membership';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const baseClasses = 'inline-flex items-center font-montserrat font-semibold rounded-full';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    ai: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg',
    limited: 'bg-primary-red text-white shadow-lg',
    sale: 'bg-primary-gold text-primary-black shadow-gold',
    new: 'bg-green-500 text-white',
    membership: 'bg-primary-black text-primary-gold border border-primary-gold',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  return (
    <span className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </span>
  );
};
