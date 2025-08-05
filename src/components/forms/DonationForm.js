import React, { useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';

const DonationForm = ({ onDonationSuccess }) => {
  const [formData, setFormData] = useState({
    type: '',
    quantity: '',
    comments: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axiosConfig.post('/donations', formData);
      showSuccessToast('Donation submitted successfully!');
      setFormData({
        type: '',
        quantity: '',
        comments: ''
      });
      
      // Notify parent component of successful donation
      if (onDonationSuccess) {
        onDonationSuccess();
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to submit donation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="donationType" className="form-label">Donation Type</label>
        <select 
          className="form-select" 
          id="donationType"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select donation type</option>
          <option value="food">Food</option>
          <option value="water">Water</option>
          <option value="medicine">Medicine</option>
          <option value="clothing">Clothing</option>
          <option value="shelter">Shelter</option>
          <option value="money">Money</option>
          <option value="other">Other</option>
        </select>
        <div className="invalid-feedback">
          Please select a donation type.
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input 
          type="text" 
          className="form-control" 
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="e.g., 5 cans, $100, 3 boxes"
          required
        />
        <div className="invalid-feedback">
          Please provide quantity.
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="comments" className="form-label">Additional Comments</label>
        <textarea 
          className="form-control" 
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows="3" 
          placeholder="Any additional information about your donation"
        ></textarea>
      </div>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary">Cancel</button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : 'Submit Donation'}
        </button>
      </div>
    </form>
  );
};

export default DonationForm;