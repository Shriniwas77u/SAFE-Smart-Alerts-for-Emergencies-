import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ToastNotifications from './components/common/ToastNotifications';

// Home Page
import Home from './pages/Home';

// About Page
import About from './pages/About'; // Add this import

// Authentication
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';

// Contacts Page
import Contact from './pages/Contact';

// Victim Dashboard
import VictimDashboard from './pages/victim/VictimDashboard';
import VictimDashboardHome from './pages/victim/VictimDashboardHome';
import RequestHelpPage from './pages/victim/RequestHelpPage';
import DonationsPage from './pages/victim/DonationsPage';
import ViewAlertsPage from './pages/victim/ViewAlertsPage';
import MyRequestsPage from './pages/victim/MyRequestsPage';

// Volunteer Dashboard
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import VolunteerDashboardHome from './pages/volunteer/VolunteerDashboardHome';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AlertsMapPage from './pages/admin/AlertsMapPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import HelpRequestsPage from './pages/admin/HelpRequestsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';
import './styles/custom.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastNotifications />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          
          {/* About Route */}
          <Route path="/about" element={<About />} /> {/* Add this route */}
          
          {/* Contacts Route */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* Victim Routes */}
          <Route path="/victim" element={
            <ProtectedRoute requiredRole="victim">
              <VictimDashboard />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<VictimDashboardHome />} />
            <Route path="my-requests" element={<MyRequestsPage />} />
            <Route path="request-help" element={<RequestHelpPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="alerts" element={<ViewAlertsPage />} />
            
            {/* Add a catch-all route for victim */}
            <Route path="*" element={<Navigate to="/victim/dashboard" replace />} />
          </Route>
          
          {/* Volunteer Routes */}
          <Route path="/volunteer" element={
            <ProtectedRoute requiredRole="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<VolunteerDashboardHome />} />
            
            {/* Add a catch-all route for volunteer */}
            <Route path="*" element={<Navigate to="/volunteer/dashboard" replace />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboardHome />} />
            <Route path="alerts-map" element={<AlertsMapPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="help-requests" element={<HelpRequestsPage />} />
            
            {/* Add a catch-all route for admin */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* Global catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;