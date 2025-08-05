import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showErrorToast } from '../../components/common/ToastNotifications';
import Footer from '../../components/layout/Footer';
const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalEmergencies: 0,
    activeVolunteers: 0,
    resourcesInStock: 0,
    donationsReceived: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await axiosConfig.get('/admin/stats');
      setStats(statsResponse.data);
      
      // Fetch recent requests
      const requestsResponse = await axiosConfig.get('/helprequests/recent');
      setRecentRequests(requestsResponse.data);
      
      // Fetch recent donations
      const donationsResponse = await axiosConfig.get('/donations/recent');
      setRecentDonations(donationsResponse.data);
    } catch (error) {
      showErrorToast('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'in-progress':
        return <span className="badge bg-info">In Progress</span>;
      case 'resolved':
        return <span className="badge bg-success">Resolved</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getDonationStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'approved':
        return <span className="badge bg-info">Approved</span>;
      case 'distributed':
        return <span className="badge bg-success">Distributed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-primary text-white rounded p-4 mb-4">
        <h1 className="h2">Admin Dashboard</h1>
        <p>Monitor and manage emergency requests, donations, and users in the SAFE Portal system.</p>
      </div>

      {/* Overview Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Emergencies</h6>
                  <h3 className="mb-0">{stats.totalEmergencies}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-exclamation-triangle text-primary fs-4"></i>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-success"><i className="bi bi-arrow-up"></i> 12%</span>
                <span className="text-muted"> from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Active Volunteers</h6>
                  <h3 className="mb-0">{stats.activeVolunteers}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-people text-success fs-4"></i>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-success"><i className="bi bi-arrow-up"></i> 5%</span>
                <span className="text-muted"> from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Resources In Stock</h6>
                  <h3 className="mb-0">{stats.resourcesInStock}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-box-seam text-info fs-4"></i>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-danger"><i className="bi bi-arrow-down"></i> 3%</span>
                <span className="text-muted"> from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Donations Received</h6>
                  <h3 className="mb-0">${stats.donationsReceived.toLocaleString()}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-cash text-warning fs-4"></i>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-success"><i className="bi bi-arrow-up"></i> 18%</span>
                <span className="text-muted"> from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Help Requests</h5>
              <a href="/admin/help-requests" className="btn btn-sm btn-outline-primary">View All</a>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Victim</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.length > 0 ? (
                      recentRequests.map((request) => (
                        <tr key={request.id}>
                          <td>#{request.id}</td>
                          <td>{request.victimName}</td>
                          <td>{request.emergencyType}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">View</button>
                            {request.status === 'pending' && (
                              <button className="btn btn-sm btn-outline-success">Approve</button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          No recent requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Recent Donations</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                {recentDonations.length > 0 ? (
                  recentDonations.map((donation) => (
                    <div key={donation.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{donation.type}</h6>
                        <small>{getDonationStatusBadge(donation.status)}</small>
                      </div>
                      <p className="mb-1">Donated by: {donation.donorName}</p>
                      <small>{new Date(donation.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">No recent donations found</p>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <a href="/admin/donations" className="btn btn-sm btn-outline-primary">View All Donations</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;