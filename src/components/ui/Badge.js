import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  pill = false, 
  className = '',
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'bg-primary';
      case 'secondary': return 'bg-secondary';
      case 'success': return 'bg-success';
      case 'danger': return 'bg-danger';
      case 'warning': return 'bg-warning text-dark';
      case 'info': return 'bg-info';
      case 'light': return 'bg-light text-dark';
      case 'dark': return 'bg-dark';
      default: return 'bg-primary';
    }
  };

  return (
    <span 
      className={`badge ${getVariantClass()} ${pill ? 'rounded-pill' : ''} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;