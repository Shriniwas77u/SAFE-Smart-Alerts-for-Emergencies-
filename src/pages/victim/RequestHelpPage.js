import React, { useState } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import EmergencyForm from '../../components/forms/EmergencyForm';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const RequestHelpPage = () => {
  const [formData, setFormData] = useState({
    emergencyType: '',
    description: '',
    location: '', // will store lat,lng as string
    address: '',
    
  });
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMapClick = (e) => {
    // Not needed for Leaflet, handled in LocationMarker
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarker(e.latlng);
        setFormData({
          ...formData,
          location: `${e.latlng.lat},${e.latlng.lng}`
        });
      }
    });
    return marker ? <Marker position={marker} /> : null;
  }

const handleEmergencySubmitted = () => {
  showSuccessToast('Your emergency request has been submitted successfully!');
};
<EmergencyForm onEmergencySubmitted={handleEmergencySubmitted} />
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate help request submission
    setTimeout(() => {
      showSuccessToast('Help request submitted successfully!');
      setFormData({
        emergencyType: '',
        description: '',
        location: '',
        address: '',
        photos: []
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h2">Request Emergency Help</h1>
        <p className="text-muted">Fill out the form below to request immediate assistance</p>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="emergencyType" className="form-label">Emergency Type</label>
              <select 
                className="form-select" 
                id="emergencyType"
                name="emergencyType"
                value={formData.emergencyType}
                onChange={handleChange}
                required
              >
                <option value="">Select emergency type</option>
                <option value="medical">Medical Emergency</option>
                <option value="fire">Fire</option>
                <option value="crime">Crime</option>
                <option value="accident">Accident</option>
                <option value="natural">Natural Disaster</option>
                <option value="other">Other</option>
              </select>
              <div className="invalid-feedback">
                Please select an emergency type.
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4" 
                placeholder="Describe the emergency situation"
                required
              ></textarea>
              <div className="invalid-feedback">
                Please provide a description.
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Location</label>
              <div className="border rounded" style={{ height: '300px' }}>
                <MapContainer center={marker || [20.5937, 78.9629]} zoom={marker ? 14 : 5} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker />
                </MapContainer>
              </div>
              <div className="form-text">Click on the map to set your location or enter address below</div>
              <input 
                type="text" 
                className="form-control mt-2" 
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
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
                ) : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestHelpPage;