import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getUser, logout } from '../../utils/auth';
import { showSuccessToast } from '../../components/common/ToastNotifications';

const VolunteerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    logout();
    showSuccessToast('You have been logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SAFE Portal</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className={`nav-link ${isActive('/volunteer/dashboard') ? 'active' : ''}`} href="/volunteer/dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-1"></i> {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar Navigation */}
        <div className={`bg-light sidebar ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`} style={{ width: '250px' }}>
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className={`nav-link ${isActive('/volunteer/dashboard') ? 'active' : ''}`} href="/volunteer/dashboard">
                  <i className="bi bi-house-door me-2"></i> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/volunteer/nearby-requests') ? 'active' : ''}`} href="/volunteer/nearby-requests">
                  <i className="bi bi-geo-alt me-2"></i> Nearby Requests
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/volunteer/my-offers') ? 'active' : ''}`} href="/volunteer/my-offers">
                  <i className="bi bi-hand-thumbs-up me-2"></i> My Offers
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/volunteer/alerts') ? 'active' : ''}`} href="/volunteer/alerts">
                  <i className="bi bi-bell me-2"></i> View Alerts
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VolunteerDashboard;