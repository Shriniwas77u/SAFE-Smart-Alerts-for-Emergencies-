import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import SearchForm from '../../components/forms/SearchForm';

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, statusFilter, typeFilter, searchQuery]);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get('/admin/donations');
      setDonations(response.data);
    } catch (error) {
      showErrorToast('Failed to fetch donations');
    } finally {
      setIsLoading(false);
    }
  };

  const filterDonations = () => {
    let result = [...donations];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(donation => donation.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(donation => donation.type === typeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(donation => 
        donation.donorName.toLowerCase().includes(query) ||
        donation.type.toLowerCase().includes(query) ||
        donation.quantity.toLowerCase().includes(query)
      );
    }
    
    setFilteredDonations(result);
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

  const handleApproveDonation = async (donationId) => {
    try {
      await axiosConfig.patch(`/admin/donations/${donationId}`, { status: 'approved' });
      showSuccessToast('Donation approved successfully');
      fetchDonations();
    } catch (error) {
      showErrorToast('Failed to approve donation');
    }
  };

  const handleRejectDonation = async (donationId) => {
    try {
      await axiosConfig.patch(`/admin/donations/${donationId}`, { status: 'rejected' });
      showSuccessToast('Donation rejected');
      fetchDonations();
    } catch (error) {
      showErrorToast('Failed to reject donation');
    }
  };

  const handleDistributeDonation = async (donationId) => {
    try {
      await axiosConfig.patch(`/admin/donations/${donationId}`, { status: 'distributed' });
      showSuccessToast('Donation marked as distributed');
      fetchDonations();
    } catch (error) {
      showErrorToast('Failed to update donation status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'approved':
        return <span className="badge bg-info">Approved</span>;
      case 'distributed':
        return <span className="badge bg-success">Distributed</span>;
      case 'rejected':
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getUniqueTypes = () => {
    const types = donations.map(d => d.type);
    return [...new Set(types)];
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">Donations Management</h1>
          <p className="text-muted">Manage and track all donations in the system</p>
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
                    <i className="bi bi-box-seam text-primary fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Total Donations</h6>
                  <h3 className="mb-0">{donations.length}</h3>
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
                    {donations.filter(d => d.status === 'pending').length}
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
                    <i className="bi bi-check-circle text-info fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Approved</h6>
                  <h3 className="mb-0">
                    {donations.filter(d => d.status === 'approved').length}
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
                    <i className="bi bi-truck text-success fs-4"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-0">Distributed</h6>
                  <h3 className="mb-0">
                    {donations.filter(d => d.status === 'distributed').length}
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
            <div className="col-md-4">
              <SearchForm 
                placeholder="Search donations..."
                onSearch={handleSearch}
                className="w-100"
              />
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="distributed">Distributed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-4">
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
          </div>
        </div>
      </div>

      {/* Donations Table */}
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
                      <th>Donor</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.length > 0 ? (
                      filteredDonations.map((donation) => (
                        <tr key={donation.id}>
                          <td>#{donation.id}</td>
                          <td>
                            <div>
                              <div className="fw-bold">{donation.donorName}</div>
                              <div className="text-muted small">{donation.donorEmail}</div>
                            </div>
                          </td>
                          <td>{donation.type}</td>
                          <td>{donation.quantity}</td>
                          <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                          <td>{getStatusBadge(donation.status)}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-primary">View</button>
                              {donation.status === 'pending' && (
                                <>
                                  <button 
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleApproveDonation(donation.id)}
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRejectDonation(donation.id)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {donation.status === 'approved' && (
                                <button 
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => handleDistributeDonation(donation.id)}
                                >
                                  Mark Distributed
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-3">
                          {donations.length === 0 
                            ? "No donations found" 
                            : "No donations match your filters"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {filteredDonations.length > 0 && (
                <nav aria-label="Donations pagination">
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
    </div>
  );
};

export default DonationsPage;