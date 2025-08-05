import React, { useState, memo } from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { getUser, logout } from '../../utils/auth';
import { showSuccessToast } from '../../components/common/ToastNotifications';

const VictimDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    showSuccessToast('You have been logged out successfully');
    navigate('/home');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1030 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SAFE Portal</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleSidebar}
            aria-controls="sidebarNav"
            aria-expanded={sidebarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/dashboard') ? 'active' : ''}`} 
                  href="/victim/dashboard"
                  aria-current={isActive('/victim/dashboard') ? 'page' : undefined}
                >
                  Dashboard
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i> {user?.name || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><a className="dropdown-item" href="/victim/profile">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar Navigation */}
        <div 
          className={`bg-light sidebar ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`} 
          style={{ width: sidebarCollapsed ? '60px' : '250px', transition: 'width 0.3s' }}
          id="sidebarNav"
        >
          {/* Collapse Button for Desktop */}
          <button 
            className="btn btn-sm btn-light position-absolute end-0 top-0 d-none d-md-block"
            onClick={toggleSidebarCollapse}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <i className={`bi bi-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
          </button>

          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/dashboard') ? 'active' : ''}`} 
                  href="/victim/dashboard"
                  aria-current={isActive('/victim/dashboard') ? 'page' : undefined}
                >
                  <i className="bi bi-house-door me-2"></i> 
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/request-help') ? 'active' : ''}`} 
                  href="/victim/request-help"
                  aria-current={isActive('/victim/request-help') ? 'page' : undefined}
                >
                  <i className="bi bi-exclamation-triangle me-2"></i> 
                  {!sidebarCollapsed && <span>Request Help</span>}
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/my-requests') ? 'active' : ''}`} 
                  href="/victim/my-requests"
                  aria-current={isActive('/victim/my-requests') ? 'page' : undefined}
                >
                  <i className="bi bi-list-task me-2"></i> 
                  {!sidebarCollapsed && <span>My Requests</span>}
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/alerts') ? 'active' : ''}`} 
                  href="/victim/alerts"
                  aria-current={isActive('/victim/alerts') ? 'page' : undefined}
                >
                  <i className="bi bi-bell me-2"></i> 
                  {!sidebarCollapsed && <span>View Alerts</span>}
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${isActive('/victim/donations') ? 'active' : ''}`} 
                  href="/victim/donations"
                  aria-current={isActive('/victim/donations') ? 'page' : undefined}
                >
                  <i className="bi bi-box-seam me-2"></i> 
                  {!sidebarCollapsed && <span>Donations</span>}
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

export default memo(VictimDashboard);