import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  icon = null,
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'success': return 'btn-success';
      case 'danger': return 'btn-danger';
      case 'warning': return 'btn-warning';
      case 'info': return 'btn-info';
      case 'light': return 'btn-light text-dark';
      case 'dark': return 'btn-dark';
      case 'link': return 'btn-link';
      case 'outline-primary': return 'btn-outline-primary';
      case 'outline-secondary': return 'btn-outline-secondary';
      case 'outline-success': return 'btn-outline-success';
      case 'outline-danger': return 'btn-outline-danger';
      case 'outline-warning': return 'btn-outline-warning';
      case 'outline-info': return 'btn-outline-info';
      case 'outline-light': return 'btn-outline-light text-dark';
      case 'outline-dark': return 'btn-outline-dark';
      default: return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'btn-sm';
      case 'lg': return 'btn-lg';
      default: return '';
    }
  };

  return (
    <button 
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </>
      ) : (
        <>
          {icon && <i className={`bi ${icon} me-2`}></i>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;