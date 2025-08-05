import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/auth';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem('authData');
    setExpanded(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-danger">SAFE</span> Portal
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>Home</Link>
            </li>
             
             <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setExpanded(false)}>Contacts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setExpanded(false)}>About</Link>
            </li>
           
           
            
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/victim/dashboard" onClick={() => setExpanded(false)}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setExpanded(false)}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-danger ms-2" to="/register" onClick={() => setExpanded(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;