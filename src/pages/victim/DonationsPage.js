import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showSuccessToast, showErrorToast } from '../../components/common/ToastNotifications';
import DonationForm from '../../components/forms/DonationForm';
const DonationsPage = () => {
  const [activeTab, setActiveTab] = useState('make-donation');
  const [donationForm, setDonationForm] = useState({
    type: '',
    quantity: '',
    comments: ''
  });
  const [donationHistory, setDonationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const response = await axiosConfig.get('/donations/my-donations');
      setDonationHistory(response.data);
    } catch (error) {
      showErrorToast('Failed to fetch donation history');
    }
  };

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonationForm({
      ...donationForm,
      [name]: value
    });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axiosConfig.post('/donations', donationForm);
      showSuccessToast('Donation submitted successfully!');
      setDonationForm({
        type: '',
        quantity: '',
        comments: ''
      });
      fetchDonationHistory();
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to submit donation');
    } finally {
      setIsLoading(false);
    }
  };

const handleDonationSuccess = () => {
  // Refresh donation history or perform other actions
  fetchDonationHistory();
};
// In the JSX:
<DonationForm onDonationSuccess={handleDonationSuccess} />
  const getStatusBadge = (status) => {
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

  return (
    <div>
      <div className="mb-4">
        <h1 className="h2">Donations</h1>
        <p className="text-muted">Contribute resources to help those in need</p>
      </div>
      
      <ul className="nav nav-tabs mb-4" id="donationTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === 'make-donation' ? 'active' : ''}`}
            onClick={() => setActiveTab('make-donation')}
            type="button"
          >
            Make Donation
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === 'donation-history' ? 'active' : ''}`}
            onClick={() => setActiveTab('donation-history')}
            type="button"
          >
            Donation History
          </button>
        </li>
      </ul>
      
      <div className="tab-content">
        {/* Make Donation Tab */}
        {activeTab === 'make-donation' && (
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleDonationSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="donationType" className="form-label">Donation Type</label>
                  <select 
                    className="form-select" 
                    id="donationType"
                    name="type"
                    value={donationForm.type}
                    onChange={handleDonationChange}
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
                    value={donationForm.quantity}
                    onChange={handleDonationChange}
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
                    value={donationForm.comments}
                    onChange={handleDonationChange}
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
            </div>
          </div>
        )}
        
        {/* Donation History Tab */}
        {activeTab === 'donation-history' && (
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donationHistory.length > 0 ? (
                      donationHistory.map((donation) => (
                        <tr key={donation.id}>
                          <td>{new Date(donation.date).toLocaleDateString()}</td>
                          <td>{donation.type}</td>
                          <td>{donation.quantity}</td>
                          <td>{getStatusBadge(donation.status)}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">View</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">
                          No donation history found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <nav aria-label="Donation history pagination">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsPage;