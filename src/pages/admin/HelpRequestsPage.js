import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import SearchForm from '../../components/forms/SearchForm';

const HelpRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');

  useEffect(() => {
    fetchRequests();
    fetchVolunteers();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter, typeFilter, urgencyFilter, searchQuery]);

  const fetchRequests = async () => {
    setIsLoading(true);
    // Simulate static help requests data
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          victimName: 'Amit',
          victimPhone: '+919876543210',
          emergencyType: 'fire',
          location: 'Sector 21',
          description: 'Fire reported near market area.',
          createdAt: '2025-08-03T10:30:00',
          urgency: 'high',
          status: 'pending'
        },
        {
          id: 2,
          victimName: 'Priya',
          victimPhone: '+919812345678',
          emergencyType: 'medical',
          location: 'Sector 15',
          description: 'Medical emergency at school.',
          createdAt: '2025-08-03T09:50:00',
          urgency: 'critical',
          status: 'approved'
        },
        {
          id: 3,
          victimName: 'Rahul',
          victimPhone: '+919800112233',
          emergencyType: 'crime',
          location: 'Sector 7',
          description: 'Suspicious activity reported.',
          createdAt: '2025-08-03T08:20:00',
          urgency: 'medium',
          status: 'resolved'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchVolunteers = async () => {
    // Simulate static volunteers data
    setTimeout(() => {
      setVolunteers([
        { id: 101, name: 'Suresh', distance: 1.2 },
        { id: 102, name: 'Meena', distance: 2.5 },
        { id: 103, name: 'Vikram', distance: 0.8 }
      ]);
    }, 500);
  };

  const filterRequests = () => {
    let result = [...requests];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(request => request.emergencyType === typeFilter);
    }
    
    // Apply urgency filter
    if (urgencyFilter !== 'all') {
      result = result.filter(request => request.urgency === urgencyFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(request => 
        request.victimName.toLowerCase().includes(query) ||
        request.emergencyType.toLowerCase().includes(query) ||
        request.description.toLowerCase().includes(query) ||
        request.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredRequests(result);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleTypeChange = (type) => {
    setTypeFilter(type);
  };

  const handleUrgencyChange = (urgency) => {
    setUrgencyFilter(urgency);
  };

  const handleApproveRequest = async (requestId) => {
    try {
      // Simulate approving request
      showSuccessToast('Help request approved successfully');
      // Simulate Twilio SMS sending to nearby victims
      const nearbyVictims = [
        { name: 'Amit', phone: '+919876543210' },
        { name: 'Priya', phone: '+919812345678' },
        { name: 'Rahul', phone: '+919800112233' }
      ];
      nearbyVictims.forEach(victim => {
        showSuccessToast(`SMS sent to ${victim.name} (${victim.phone}): Emergency alert!`);
      });
      fetchRequests();
    } catch (error) {
      showErrorToast('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axiosConfig.patch(`/admin/helprequests/${requestId}`, { status: 'rejected' });
      showSuccessToast('Help request rejected');
      fetchRequests();
    } catch (error) {
      showErrorToast('Failed to reject request');
    }
  };

  const handleAssignVolunteer = (request) => {
    setSelectedRequest(request);
    setShowAssignModal(true);
  };

  const confirmAssignment = async () => {
    if (!selectedRequest || !selectedVolunteer) return;
    
    try {
      await axiosConfig.post(`/admin/helprequests/${selectedRequest.id}/assign`, {
        volunteerId: selectedVolunteer
      });
      showSuccessToast('Volunteer assigned successfully');
      setShowAssignModal(false);
      setSelectedVolunteer('');
      fetchRequests();
    } catch (error) {
      showErrorToast('Failed to assign volunteer');
    }
  };

  const handleMarkResolved = async (requestId) => {
    try {
      await axiosConfig.patch(`/admin/helprequests/${requestId}`, { status: 'resolved' });
      showSuccessToast('Help request marked as resolved');
      fetchRequests();
    } catch (error) {
      showErrorToast('Failed to update request status');
    }
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
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'critical':
        return <span className="badge bg-danger">Critical</span>;
      case 'high':
        return <span className="badge bg-warning">High</span>;
      case 'medium':
        return <span className="badge bg-info">Medium</span>;
      case 'low':
        return <span className="badge bg-success">Low</span>;
      default:
        return <span className="badge bg-secondary">{urgency}</span>;
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

  const getUniqueTypes = () => {
    const types = requests.map(r => r.emergencyType);
    return [...new Set(types)];
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">Help Requests Management</h1>
          <p className="text-muted">Manage and respond to emergency help requests</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-download me-2"></i>Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-exclamation-triangle text-primary fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Total Requests</h6>
                  <h3 className="mb-0">{requests.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-hourglass-split text-warning fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Pending</h6>
                  <h3 className="mb-0">
                    {requests.filter(r => r.status === 'pending').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-arrow-repeat text-info fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">In Progress</h6>
                  <h3 className="mb-0">
                    {requests.filter(r => r.status === 'in-progress').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                    <i className="bi bi-check-circle text-success fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Resolved</h6>
                  <h3 className="mb-0">
                    {requests.filter(r => r.status === 'resolved').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <SearchForm 
                placeholder="Search requests..."
                onSearch={handleSearch}
                className="w-100"
              />
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={typeFilter}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="all">All Types</option>
                {getUniqueTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={urgencyFilter}
                onChange={(e) => handleUrgencyChange(e.target.value)}
              >
                <option value="all">All Urgency Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
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
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Victim</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td>#{request.id}</td>
                          <td>
                            <div>
                              <div className="fw-bold">{request.victimName}</div>
                              <div className="text-muted small">{request.victimPhone}</div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className={`bi ${getEmergencyIcon(request.emergencyType)} me-2`}></i>
                              {request.emergencyType}
                            </div>
                          </td>
                          <td>{request.location}</td>
                          <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                          <td>{getUrgencyBadge(request.urgency)}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-primary">View</button>
                              {request.status === 'pending' && (
                                <>
                                  <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleApproveRequest(request.id)}
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {request.status === 'approved' && (
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleAssignVolunteer(request)}
                                >
                                  Assign
                                </button>
                              )}
                              {request.status === 'in-progress' && (
                                <button 
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => handleMarkResolved(request.id)}
                                >
                                  Resolve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-3">
                          {requests.length === 0 
                            ? "No help requests found" 
                            : "No requests match your filters"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {filteredRequests.length > 0 && (
                <nav aria-label="Requests pagination">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* Assign Volunteer Modal */}
      {selectedRequest && (
        <div className={`modal fade ${showAssignModal ? 'show' : ''}`} style={{ display: showAssignModal ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Volunteer</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>Request Details</h6>
                  <p><strong>Type:</strong> {selectedRequest.emergencyType}</p>
                  <p><strong>Location:</strong> {selectedRequest.location}</p>
                  <p><strong>Description:</strong> {selectedRequest.description}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="volunteerSelect" className="form-label">Select Volunteer</label>
                  <select 
                    className="form-select" 
                    id="volunteerSelect"
                    value={selectedVolunteer}
                    onChange={(e) => setSelectedVolunteer(e.target.value)}
                  >
                    <option value="">Choose a volunteer...</option>
                    {volunteers.map(volunteer => (
                      <option key={volunteer.id} value={volunteer.id}>
                        {volunteer.name} - {volunteer.distance} miles away
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={confirmAssignment}
                  disabled={!selectedVolunteer}
                >
                  Assign Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal backdrop */}
      {showAssignModal && (
        <div className="modal-backdrop fade show" onClick={() => setShowAssignModal(false)}></div>
      )}
    </div>
  );
};

export default HelpRequestsPage;