import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  onClick = null,
  inkWash = false,
  elevation = 'md',
  chineseBrush = false
}) => {
  const elevationClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const cardClasses = `
    bg-white 
    rounded-lg 
    ${elevationClasses[elevation]} 
    p-4
    ${inkWash ? 'ink-wash-bg' : ''}
    ${chineseBrush ? 'chinese-brush-border' : ''}
    ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''}
    ${className}
  `;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;