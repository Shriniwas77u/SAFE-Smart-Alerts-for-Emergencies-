import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showErrorToast } from '../../components/common/ToastNotifications';

const AlertsMapPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axiosConfig.get('/alerts');
      setAlerts(response.data);
    } catch (error) {
      showErrorToast('Failed to fetch alerts');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="badge bg-danger">Critical</span>;
      case 'high':
        return <span className="badge bg-warning">High</span>;
      case 'medium':
        return <span className="badge bg-info">Medium</span>;
      case 'low':
        return <span className="badge bg-success">Low</span>;
      default:
        return <span className="badge bg-secondary">{severity}</span>;
    }
  };

  const handleDispatchTeam = async (alertId) => {
    try {
      await axiosConfig.post(`/alerts/${alertId}/dispatch`);
      // Show success message
      alert('Team dispatched successfully!');
    } catch (error) {
      showErrorToast('Failed to dispatch team');
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
    <div className="d-flex h-100">
      {/* Map Area */}
      <div className="flex-grow-1">
        <div className="h-100" style={{ position: 'relative' }}>
          {/* Map component would be embedded here */}
          <div className="d-flex align-items-center justify-content-center h-100 bg-light">
            <p className="text-muted">Interactive map showing emergency alerts will be displayed here</p>
          </div>
          
          {/* Map Legend */}
          <div className="card shadow-sm" style={{ position: 'absolute', top: '20px', right: '20px', width: '200px' }}>
            <div className="card-body">
              <h6 className="card-title">Alert Severity</h6>
              <div className="d-flex align-items-center mb-2">
                <div className="bg-danger rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                <span>Critical</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="bg-warning rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                <span>High</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="bg-info rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                <span>Medium</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts Sidebar */}
      <div className="bg-white border-start" style={{ width: '350px', maxWidth: '100%' }}>
        <div className="p-3 border-bottom">
          <h5 className="mb-0">Active Alerts</h5>
          <p className="text-muted mb-0">Click on map clusters to view alerts</p>
        </div>
        
        <div className="overflow-auto" style={{ height: 'calc(100% - 70px)' }}>
          <div className="list-group list-group-flush">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">{alert.title}</h6>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="mb-1">{alert.location}</p>
                  <small>Reported: {alert.timeAgo}</small>
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-primary me-1">View Details</button>
                    <button 
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleDispatchTeam(alert.id)}
                    >
                      Dispatch Team
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted">No active alerts at the moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsMapPage;