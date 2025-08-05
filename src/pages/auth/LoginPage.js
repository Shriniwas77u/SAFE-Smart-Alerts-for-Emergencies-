import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../api/axiosConfig';
import { setAuthData } from '../../utils/auth';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login with static data
    setTimeout(() => {
      setIsLoading(false);
      // Static user data for demo
      let user = { role: 'victim', name: 'Demo User' };
      if (emailOrPhone === 'admin') user.role = 'admin';
      else if (emailOrPhone === 'volunteer') user.role = 'volunteer';
      setAuthData('demo-token', user);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'volunteer') {
        navigate('/volunteer/dashboard');
      } else {
        navigate('/victim/dashboard');
      }
      showSuccessToast('Login successful!');
    }, 1200);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold text-primary">SAFE Portal</h1>
          <p className="text-muted">Smart Alert For Emergencies</p>
        </div>
        
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="emailOrPhone" className="form-label">Email or Phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="emailOrPhone" 
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone number"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid email or phone number.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">
              Please provide your password.
            </div>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          
          <div className="d-grid gap-2">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary mt-2"
              onClick={() => {
                setEmailOrPhone('admin');
                setPassword('admin');
                setTimeout(() => {
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }, 100);
              }}
            >
              Admin Login
            </button>
          </div>
          
          <div className="text-center mt-3">
            <p className="mb-0">Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;