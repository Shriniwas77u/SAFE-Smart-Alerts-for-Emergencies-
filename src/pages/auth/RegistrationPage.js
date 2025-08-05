import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    role: 'victim'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // Simulate registration with static data
    setTimeout(() => {
      setIsLoading(false);
      showSuccessToast('Registration successful! Please login.');
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold text-primary">SAFE Portal</h1>
          <p className="text-muted">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            <div className="invalid-feedback">
              Please provide your full name.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input 
              type="tel" 
              className="form-control" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            <div className="invalid-feedback">
              Please provide a valid phone number.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">
              Password must be at least 8 characters.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
            <div className="invalid-feedback">
              Passwords do not match.
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="emergencyContact" className="form-label">Emergency Contact</label>
            <input 
              type="text" 
              className="form-control" 
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Name and phone number"
              required
            />
            <div className="invalid-feedback">
              Please provide an emergency contact.
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">I am a:</label>
            <div>
              <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="role" 
                  id="roleVictim" 
                  value="victim"
                  checked={formData.role === 'victim'}
                  onChange={handleChange}
                  required 
                />
                <label className="form-check-label" htmlFor="roleVictim">Victim</label>
              </div>
              <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="role" 
                  id="roleVolunteer" 
                  value="volunteer"
                  checked={formData.role === 'volunteer'}
                  onChange={handleChange}
                  required 
                />
                <label className="form-check-label" htmlFor="roleVolunteer">Volunteer</label>
              </div>
            </div>
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
                  Creating Account...
                </>
              ) : 'Register'}
            </button>
          </div>
          
          <div className="text-center mt-3">
            <p className="mb-0">Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;