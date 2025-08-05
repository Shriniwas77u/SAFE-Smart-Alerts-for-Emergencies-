import React from 'react';
import { getUser } from '../../utils/auth';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
const VictimDashboardHome = () => {
  const user = getUser();

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-primary text-white rounded p-4 mb-4">
        <h1 className="h2">Welcome, {user?.name}!</h1>
        <p>SAFE Portal is here to help you in emergencies. Request assistance, view alerts, or donate resources.</p>
      </div>

      {/* Action Cards */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm hover-card">
            <div className="card-body text-center">
              <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3"></i>
              <h5 className="card-title">Request Help</h5>
              <p className="card-text">Get immediate assistance in emergencies</p>
              <a href="/victim/request-help" className="btn btn-primary">Request Now</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
         <Card className="h-100 shadow-sm hover-card"></Card>
            <div className="card-body text-center">
              <i className="bi bi-list-task text-info fs-1 mb-3"></i>
              <h5 className="card-title">My Requests</h5>
              <p className="card-text">Track your help requests</p>
             <Button variant="primary" href="/victim/request-help">Request Now</Button>
            </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm hover-card">
            <div className="card-body text-center">
              <i className="bi bi-bell text-warning fs-1 mb-3"></i>
              <h5 className="card-title">View Alerts</h5>
              <p className="card-text">Stay informed about emergencies</p>
              <a href="/victim/alerts" className="btn btn-primary">View Alerts</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm hover-card">
            <div className="card-body text-center">
              <i className="bi bi-box-seam text-success fs-1 mb-3"></i>
              <h5 className="card-title">Donations</h5>
              <p className="card-text">Contribute resources to help others</p>
              <a href="/victim/donations" className="btn btn-primary">Donate Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimDashboardHome;