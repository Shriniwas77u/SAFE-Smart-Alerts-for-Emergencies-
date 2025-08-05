import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getUser, logout } from '../../utils/auth';
import { showSuccessToast } from '../../components/common/ToastNotifications';
import Footer from '../../components/layout/Footer';
const AdminDashboard = () => {
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
                <a className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`} href="/admin/dashboard">
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
                <a className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`} href="/admin/dashboard">
                  <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/admin/help-requests') ? 'active' : ''}`} href="/admin/help-requests">
                  <i className="bi bi-exclamation-triangle me-2"></i> Help Requests
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/admin/donations') ? 'active' : ''}`} href="/admin/donations">
                  <i className="bi bi-box-seam me-2"></i> Donations
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/admin/alerts-map') ? 'active' : ''}`} href="/admin/alerts-map">
                  <i className="bi bi-map me-2"></i> Alerts Map
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`} href="/admin/users">
                  <i className="bi bi-people me-2"></i> User Management
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

export default AdminDashboard;