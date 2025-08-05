import React, { useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';

const EmergencyForm = ({ onEmergencySubmitted }) => {
  const [formData, setFormData] = useState({
    emergencyType: '',
    description: '',
    location: '',
    address: '',
    photos: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('emergencyType', formData.emergencyType);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('address', formData.address);
      
      // Append each photo
      formData.photos.forEach(photo => {
        data.append('photos', photo);
      });
      
      await axiosConfig.post('/helprequests', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      showSuccessToast('Emergency request submitted successfully!');
      
      // Reset form
      setFormData({
        emergencyType: '',
        description: '',
        location: '',
        address: '',
        photos: []
      });
      
      // Notify parent component
      if (onEmergencySubmitted) {
        onEmergencySubmitted();
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to submit emergency request');
    } finally {
      setIsLoading(false);
    }
  };

  const getEmergencyIcon = (type) => {
    switch (type) {
      case 'medical': return 'bi-heart-pulse-fill';
      case 'fire': return 'bi-fire';
      case 'crime': return 'bi-shield-exclamation';
      case 'accident': return 'bi-car-front-fill';
      case 'natural': return 'bi-tsunami';
      default: return 'bi-exclamation-triangle-fill';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-4">
        <label htmlFor="emergencyType" className="form-label fw-bold">Emergency Type</label>
        <div className="row g-3">
          {[
            { value: 'medical', label: 'Medical Emergency', color: 'danger' },
            { value: 'fire', label: 'Fire', color: 'warning' },
            { value: 'crime', label: 'Crime', color: 'dark' },
            { value: 'accident', label: 'Accident', color: 'info' },
            { value: 'natural', label: 'Natural Disaster', color: 'success' },
            { value: 'other', label: 'Other', color: 'secondary' }
          ].map((type) => (
            <div className="col-md-4 col-sm-6" key={type.value}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="emergencyType"
                  id={`emergency-${type.value}`}
                  value={type.value}
                  checked={formData.emergencyType === type.value}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor={`emergency-${type.value}`}>
                  <i className={`bi ${getEmergencyIcon(type.value)} text-${type.color} me-2`}></i>
                  {type.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="invalid-feedback">
          Please select an emergency type.
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="form-label fw-bold">Description</label>
        <textarea 
          className="form-control" 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4" 
          placeholder="Please describe the emergency situation in detail..."
          required
        ></textarea>
        <div className="invalid-feedback">
          Please provide a description of the emergency.
        </div>
      </div>
      
      <div className="mb-4">
        <label className="form-label fw-bold">Location</label>
        <div className="card mb-3">
          <div className="card-body p-0">
            <div className="border rounded" style={{ height: '300px' }}>
              {/* Map component would be embedded here */}
              <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                <div className="text-center">
                  <i className="bi bi-geo-alt-fill fs-1 text-muted mb-3"></i>
                  <p className="text-muted">Interactive map will be displayed here</p>
                  <p className="text-muted small">Click on the map to set your location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-text mb-2">Or enter your address manually:</div>
        <input 
          type="text" 
          className="form-control" 
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address or landmark"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="photoUpload" className="form-label fw-bold">Upload Photos (Optional)</label>
        <div className="card">
          <div className="card-body">
            <div className="border rounded p-4 text-center bg-light">
              <i className="bi bi-cloud-arrow-up fs-1 text-muted mb-3"></i>
              <p className="mb-3">Drag and drop photos here or click to browse</p>
              <input 
                type="file" 
                className="d-none" 
                id="photoUpload" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
              />
              <button 
                type="button" 
                className="btn btn-outline-primary"
                onClick={() => document.getElementById('photoUpload').click()}
              >
                <i className="bi bi-folder2-open me-2"></i> Browse Files
              </button>
            </div>
            <div className="mt-3">
              {formData.photos.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="position-relative">
                      <img 
                        src={URL.createObjectURL(photo)} 
                        alt={`Preview ${index}`} 
                        className="img-thumbnail" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        style={{ transform: 'translate(50%, -50%)' }}
                        onClick={() => {
                          const newPhotos = [...formData.photos];
                          newPhotos.splice(index, 1);
                          setFormData({...formData, photos: newPhotos});
                        }}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {formData.photos.length === 0 && (
                <p className="text-muted text-center mb-0">No photos selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-secondary px-4">Cancel</button>
        <button 
          type="submit" 
          className="btn btn-danger px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            <>
              <i className="bi bi-exclamation-triangle me-2"></i>
              Submit Emergency Request
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EmergencyForm;