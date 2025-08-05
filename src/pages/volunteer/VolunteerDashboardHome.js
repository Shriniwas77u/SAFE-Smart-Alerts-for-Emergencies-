import React, { useState, useEffect } from 'react';
import { getUser } from '../../utils/auth';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';

const VolunteerDashboardHome = () => {
  const user = getUser();
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNearbyRequests();
  }, []);

  const fetchNearbyRequests = async () => {
    try {
      const response = await axiosConfig.get('/helprequests/nearby');
      setNearbyRequests(response.data);
    } catch (error) {
      showErrorToast('Failed to fetch nearby requests');
    }
  };

  const handleOfferHelp = (request) => {
    setSelectedRequest(request);
    // Show modal
    const modal = new window.bootstrap.Modal(document.getElementById('offerHelpModal'));
    modal.show();
  };

  const confirmOfferHelp = async () => {
    if (!selectedRequest) return;
    
    setIsLoading(true);
    try {
      await axiosConfig.post(`/helprequests/${selectedRequest.id}/offer`);
      showSuccessToast('Help offer submitted successfully!');
      fetchNearbyRequests();
      
      // Hide modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('offerHelpModal'));
      modal.hide();
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to offer help');
    } finally {
      setIsLoading(false);
    }
  };

  const getEmergencyBadge = (type) => {
    switch (type) {
      case 'medical':
        return <span className="badge bg-danger">Medical</span>;
      case 'fire':
        return <span className="badge bg-warning text-dark">Fire</span>;
      case 'crime':
        return <span className="badge bg-dark">Crime</span>;
      case 'accident':
        return <span className="badge bg-info">Accident</span>;
      case 'natural':
        return <span className="badge bg-success">Natural Disaster</span>;
      default:
        return <span className="badge bg-secondary">{type}</span>;
    }
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-primary text-white rounded p-4 mb-4">
        <h1 className="h2">Welcome, {user?.name}!</h1>
        <p>Thank you for volunteering to help those in need. View nearby requests and offer your assistance.</p>
      </div>

      {/* Map and Requests */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-0">Nearby Help Requests</h5>
            </div>
            <div className="card-body p-0">
              <div className="border rounded" style={{ height: '500px' }}>
                {/* Map component would be embedded here */}
                <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                  <p className="text-muted">Map showing nearby help requests will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Pending Requests</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                {nearbyRequests.length > 0 ? (
                  nearbyRequests.map((request) => (
                    <div key={request.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{request.emergencyType}</h6>
                        <small>{request.distance} mi</small>
                      </div>
                      <p className="mb-1">{request.description.substring(0, 80)}{request.description.length > 80 ? '...' : ''}</p>
                      <small>{request.timeAgo}</small>
                      <button 
                        className="btn btn-sm btn-primary mt-2 w-100" 
                        onClick={() => handleOfferHelp(request)}
                      >
                        Offer Help
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No nearby requests at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Offer Help Modal */}
      <div className="modal fade" id="offerHelpModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Offer Help</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedRequest && (
                <>
                  <h6>Emergency Type: {getEmergencyBadge(selectedRequest.emergencyType)}</h6>
                  <p><strong>Description:</strong> {selectedRequest.description}</p>
                  <p><strong>Location:</strong> {selectedRequest.location}</p>
                  <p><strong>Distance:</strong> {selectedRequest.distance} miles</p>
                  <p><strong>Time:</strong> {selectedRequest.timeAgo}</p>
                  
                  <div className="alert alert-info">
                    Are you sure you want to offer help for this emergency?
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={confirmOfferHelp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : 'Confirm Offer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;