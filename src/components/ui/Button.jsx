import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  size = 'md',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'btn cursor-pointer font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-[color:var(--danger)] text-white hover:bg-opacity-90',
    outline: 'border border-[color:var(--primary)] text-[color:var(--primary)] bg-transparent hover:bg-[color:var(--primary)] hover:bg-opacity-10',
    text: 'bg-transparent text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:bg-opacity-10 shadow-none px-2'
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 rounded',
    md: 'text-sm px-4 py-2 rounded-lg',
    lg: 'text-base px-6 py-3 rounded-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;