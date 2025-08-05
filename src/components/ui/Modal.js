import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ 
  show: controlledShow, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  backdrop = true,
  keyboard = true,
  ...props 
}) => {
  const modalRef = useRef(null);
  const [internalShow, setInternalShow] = useState(controlledShow || false);
  const [bootstrapLoaded, setBootstrapLoaded] = useState(false);
  
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledShow !== undefined;
  const show = isControlled ? controlledShow : internalShow;

  // Check if Bootstrap is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      setBootstrapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (show) {
      if (bootstrapLoaded) {
        const modal = new window.bootstrap.Modal(modalRef.current, {
          backdrop: backdrop ? 'static' : false,
          keyboard: keyboard
        });
        modal.show();
        
        modalRef.current.addEventListener('hidden.bs.modal', () => {
          if (!isControlled) {
            setInternalShow(false);
          }
          if (onClose) {
            onClose();
          }
        });
      } else {
        // Fallback: Show modal manually if Bootstrap isn't loaded
        if (modalRef.current) {
          modalRef.current.classList.add('show');
          modalRef.current.style.display = 'block';
          document.body.classList.add('modal-open');
          
          // Create backdrop manually
          const backdrop = document.createElement('div');
          backdrop.className = 'modal-backdrop fade show';
          backdrop.id = 'modal-backdrop';
          document.body.appendChild(backdrop);
        }
      }
    } else {
      if (modalRef.current) {
        if (bootstrapLoaded) {
          const modal = window.bootstrap.Modal.getInstance(modalRef.current);
          if (modal) {
            modal.hide();
          }
        } else {
          // Fallback: Hide modal manually
          modalRef.current.classList.remove('show');
          modalRef.current.style.display = 'none';
          document.body.classList.remove('modal-open');
          
          // Remove backdrop
          const backdrop = document.getElementById('modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
      }
    }
  }, [show, backdrop, keyboard, onClose, isControlled, bootstrapLoaded]);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      case 'fullscreen': return 'modal-fullscreen';
      default: return '';
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalShow(false);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className={`modal fade ${getSizeClass()} ${className}`}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden={!show}
      style={{ display: show ? 'block' : 'none' }}
      {...props}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {title && (
            <div className={`modal-header ${headerClassName}`}>
              <h5 className="modal-title" id="modalLabel">{title}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className={`modal-body ${bodyClassName}`}>
            {children}
          </div>
          {footer && (
            <div className={`modal-footer ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add static methods for imperative usage
Modal.show = (props) => {
  const modalElement = document.createElement('div');
  document.body.appendChild(modalElement);
  
  const root = ReactDOM.createRoot(modalElement);
  
  const handleClose = () => {
    root.unmount();
    document.body.removeChild(modalElement);
  };
  
  root.render(
    <Modal 
      {...props} 
      show={true} 
      onClose={handleClose}
    />
  );
};

export default Modal;