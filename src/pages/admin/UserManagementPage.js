import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/admin/users/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (error) {
      showErrorToast('Failed to search users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await axiosConfig.post('/admin/users', userData);
      showSuccessToast('User added successfully');
      // Refresh search results if query exists
      if (searchQuery) {
        handleSearch();
      }
      // Hide modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modal.hide();
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to add user');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axiosConfig.patch(`/admin/users/${userId}`, { status: newStatus });
      showSuccessToast(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      // Refresh search results
      handleSearch();
    } catch (error) {
      showErrorToast('Failed to update user status');
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="badge bg-danger">Admin</span>;
      case 'volunteer':
        return <span className="badge bg-success">Volunteer</span>;
      case 'victim':
        return <span className="badge bg-info">Victim</span>;
      default:
        return <span className="badge bg-secondary">{role}</span>;
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="badge bg-success">Active</span>
      : <span className="badge bg-secondary">Inactive</span>;
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h2">User Management</h1>
        <p className="text-muted">Search and manage users in the SAFE Portal system</p>
      </div>
      
      {/* Search Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by email or phone number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary w-100" onClick={handleSearch} disabled={isLoading}>
                <i className="bi bi-search me-1"></i> 
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Search Results</h5>
          {searchResults.length > 0 && (
            <span className="badge bg-primary">{searchResults.length} users found</span>
          )}
        </div>
        
        {searchResults.length > 0 ? (
          <div className="row g-4">
            {searchResults.map(user => (
              <div className="col-md-6 col-lg-4" key={user.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="bi bi-person text-primary fs-4"></i>
                      </div>
                      <div>
                        <h5 className="mb-0">{user.name}</h5>
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="mb-1"><i className="bi bi-envelope me-2"></i> {user.email}</p>
                      <p className="mb-1"><i className="bi bi-telephone me-2"></i> {user.phone}</p>
                      <p className="mb-1"><i className="bi bi-calendar me-2"></i> Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      {getStatusBadge(user.status)}
                      <div>
                        <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                        <button 
                          className={`btn btn-sm ${user.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleToggleUserStatus(user.id, user.status)}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-search fs-1 text-muted"></i>
            <p className="text-muted mt-3">
              {searchQuery ? 'No users found. Try a different search term.' : 'Enter a search term to find users.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Add User Button */}
      <div className="text-center">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
          <i className="bi bi-plus-circle me-1"></i> Add New User
        </button>
      </div>
      
      {/* Add User Modal */}
      <div className="modal fade" id="addUserModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form id="addUserForm">
                <div className="mb-3">
                  <label htmlFor="newUserName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="newUserName" required />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newUserEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="newUserEmail" required />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newUserPhone" className="form-label">Phone</label>
                  <input type="tel" className="form-control" id="newUserPhone" required />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newUserRole" className="form-label">Role</label>
                  <select className="form-select" id="newUserRole" required>
                    <option value="">Select role</option>
                    <option value="victim">Victim</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newUserPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="newUserPassword" required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                  const form = document.getElementById('addUserForm');
                  if (form.checkValidity()) {
                    handleAddUser({
                      name: form.newUserName.value,
                      email: form.newUserEmail.value,
                      phone: form.newUserPhone.value,
                      role: form.newUserRole.value,
                      password: form.newUserPassword.value
                    });
                  } else {
                    form.reportValidity();
                  }
                }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;