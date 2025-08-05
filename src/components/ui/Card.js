import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  header, 
  footer,
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props 
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {header && (
        <div className={`card-header ${headerClassName}`}>
          {header}
        </div>
      )}
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`card-footer ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;