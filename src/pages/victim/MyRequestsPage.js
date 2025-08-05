import React, { useState, useEffect, useCallback, memo } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import { getUser } from '../../utils/auth';
import Modal from '../../components/ui/Modal'; // Now this import will work

// Utility function for date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState(null);
  const user = getUser();

  // Memoized fetch function to prevent unnecessary re-creation
  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosConfig.get('/helprequests/my-requests');
      setRequests(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch your requests';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter(request => request.status === statusFilter);

  const handleCancelRequest = (request) => {
    setSelectedRequest(request);
    setShowCancelModal(true);
    setCancelReason(''); // Reset reason when opening modal
  };

  const confirmCancelRequest = async () => {
    if (!selectedRequest || !cancelReason.trim()) return;
    
    try {
      await axiosConfig.patch(`/helprequests/${selectedRequest.id}/cancel`, {
        reason: cancelReason
      });
      showSuccessToast('Your request has been cancelled');
      setShowCancelModal(false);
      setCancelReason('');
      fetchRequests(); // Refresh the list
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel request';
      showErrorToast(errorMessage);
    }
  };

  const handleViewDetails = (request) => {
    // In a real app, this would navigate to a details page or open a modal
    const formattedDate = formatDate(request.createdAt);
    alert(`Request Details:\n\nType: ${request.emergencyType}\nDescription: ${request.description}\nLocation: ${request.location}\nStatus: ${request.status}\nCreated: ${formattedDate.date} at ${formattedDate.time}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'approved':
        return <span className="badge bg-info">Approved</span>;
      case 'in-progress':
        return <span className="badge bg-primary">In Progress</span>;
      case 'resolved':
        return <span className="badge bg-success">Resolved</span>;
      case 'rejected':
        return <span className="badge bg-danger">Rejected</span>;
      case 'cancelled':
        return <span className="badge bg-secondary">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getEmergencyIcon = (type) => {
    switch (type) {
      case 'medical': return 'bi-heart-pulse-fill text-danger';
      case 'fire': return 'bi-fire text-warning';
      case 'crime': return 'bi-shield-exclamation text-dark';
      case 'accident': return 'bi-car-front-fill text-info';
      case 'natural': return 'bi-tsunami text-success';
      default: return 'bi-exclamation-triangle-fill text-secondary';
    }
  };

  const getStatusCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      inProgress: requests.filter(r => r.status === 'in-progress').length,
      resolved: requests.filter(r => r.status === 'resolved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      cancelled: requests.filter(r => r.status === 'cancelled').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div>
      <div className="mb-4">
        <h1 className="h2">My Help Requests</h1>
        <p className="text-muted">Track the status of your emergency help requests</p>
      </div>
      
      {/* Error display */}
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button 
            type="button" 
            className="btn-close float-end" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      {/* Status Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">All</h5>
              <h3 className="text-primary mb-0">{statusCounts.all}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Pending</h5>
              <h3 className="text-warning mb-0">{statusCounts.pending}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Approved</h5>
              <h3 className="text-info mb-0">{statusCounts.approved}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">In Progress</h5>
              <h3 className="text-primary mb-0">{statusCounts.inProgress}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Resolved</h5>
              <h3 className="text-success mb-0">{statusCounts.resolved}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Cancelled</h5>
              <h3 className="text-secondary mb-0">{statusCounts.cancelled}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Filter */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            <button 
              className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleStatusFilter('all')}
              aria-pressed={statusFilter === 'all'}
            >
              All ({statusCounts.all})
            </button>
            <button 
              className={`btn ${statusFilter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => handleStatusFilter('pending')}
              aria-pressed={statusFilter === 'pending'}
            >
              Pending ({statusCounts.pending})
            </button>
            <button 
              className={`btn ${statusFilter === 'approved' ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => handleStatusFilter('approved')}
              aria-pressed={statusFilter === 'approved'}
            >
              Approved ({statusCounts.approved})
            </button>
            <button 
              className={`btn ${statusFilter === 'in-progress' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleStatusFilter('in-progress')}
              aria-pressed={statusFilter === 'in-progress'}
            >
              In Progress ({statusCounts.inProgress})
            </button>
            <button 
              className={`btn ${statusFilter === 'resolved' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleStatusFilter('resolved')}
              aria-pressed={statusFilter === 'resolved'}
            >
              Resolved ({statusCounts.resolved})
            </button>
            <button 
              className={`btn ${statusFilter === 'cancelled' ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={() => handleStatusFilter('cancelled')}
              aria-pressed={statusFilter === 'cancelled'}
            >
              Cancelled ({statusCounts.cancelled})
            </button>
          </div>
        </div>
      </div>
      
      {/* Requests List */}
      <div className="card shadow-sm">
        <div className="card-body">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {filteredRequests.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="col-md-1">Type</th>
                        <th scope="col" className="col-md-3">Date & Time</th>
                        <th scope="col" className="col-md-5">Description</th>
                        <th scope="col" className="col-md-2">Status</th>
                        <th scope="col" className="col-md-1 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => {
                        const formattedDate = formatDate(request.createdAt);
                        return (
                          <tr key={request.id}>
                            <td>
                              <i className={`bi ${getEmergencyIcon(request.emergencyType)} fs-4`}></i>
                              <div className="d-md-none mt-1">{request.emergencyType}</div>
                            </td>
                            <td>
                              <div>{formattedDate.date}</div>
                              <div className="text-muted small">{formattedDate.time}</div>
                            </td>
                            <td>
                              <div>{request.description.substring(0, 100)}{request.description.length > 100 ? '...' : ''}</div>
                              <div className="text-muted small">
                                <i className="bi bi-geo-alt me-1"></i> {request.location}
                              </div>
                            </td>
                            <td>
                              {getStatusBadge(request.status)}
                              {request.assignedVolunteer && (
                                <div className="mt-1 small text-muted">
                                  <i className="bi bi-person-check me-1"></i> {request.assignedVolunteer}
                                </div>
                              )}
                            </td>
                            <td className="text-end">
                              <div className="d-flex flex-column flex-md-row gap-2 justify-content-end">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleViewDetails(request)}
                                  aria-label={`View details for ${request.emergencyType} request`}
                                >
                                  View
                                </button>
                                {request.status === 'pending' && (
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleCancelRequest(request)}
                                    aria-label={`Cancel ${request.emergencyType} request`}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No help requests found</h5>
                  <p className="text-muted">
                    {statusFilter === 'all' 
                      ? "You haven't made any help requests yet." 
                      : `You don't have any ${statusFilter} requests.`}
                  </p>
                  {statusFilter === 'all' && (
                    <a href="/victim/request-help" className="btn btn-primary mt-2">
                      Request Help Now
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Cancel Request Modal */}
      <Modal 
        show={showCancelModal} 
        onClose={() => setShowCancelModal(false)}
        title="Cancel Help Request"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
              Keep Request
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={confirmCancelRequest}
              disabled={!cancelReason.trim()}
            >
              Cancel Request
            </button>
          </>
        }
      >
        {selectedRequest && (
          <>
            <div className="mb-3">
              <h6>Request Details</h6>
              <p><strong>Type:</strong> {selectedRequest.emergencyType}</p>
              <p><strong>Description:</strong> {selectedRequest.description}</p>
              <p><strong>Location:</strong> {selectedRequest.location}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="cancelReason" className="form-label">Reason for Cancellation</label>
              <textarea 
                className="form-control" 
                id="cancelReason"
                rows="3"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please explain why you're cancelling this request..."
                required
              ></textarea>
            </div>
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Are you sure you want to cancel this help request? This action cannot be undone.
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default memo(MyRequestsPage);