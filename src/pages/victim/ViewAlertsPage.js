import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
import { showErrorToast } from '../../components/common/ToastNotifications';

const ViewAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchAlerts();
    getUserLocation();
  }, []);

  useEffect(() => {
    filterAlerts();
  }, [alerts, severityFilter, typeFilter, locationFilter]);

  const fetchAlerts = async () => {
    setIsLoading(true);
    // Simulate static alerts data
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          type: 'fire',
          severity: 'high',
          location: 'Sector 21',
          description: 'Fire reported near market area.',
          time: '2025-08-03 10:30',
        },
        {
          id: 2,
          type: 'medical',
          severity: 'medium',
          location: 'Sector 15',
          description: 'Medical emergency at school.',
          time: '2025-08-03 09:50',
        },
        {
          id: 3,
          type: 'crime',
          severity: 'low',
          location: 'Sector 7',
          description: 'Suspicious activity reported.',
          time: '2025-08-03 08:20',
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const filterAlerts = () => {
    let result = [...alerts];
    
    // Apply severity filter
    if (severityFilter !== 'all') {
      result = result.filter(alert => alert.severity === severityFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(alert => alert.type === typeFilter);
    }
    
    // Apply location filter
    if (locationFilter === 'nearby' && userLocation) {
      result = result.filter(alert => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          alert.latitude,
          alert.longitude
        );
        return distance <= 50; // Within 50 miles
      });
    }
    
    setFilteredAlerts(result);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula to calculate distance between two points
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
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

  const getAlertIcon = (type) => {
    switch (type) {
      case 'weather': return 'bi-cloud-lightning-rain-fill text-primary';
      case 'crime': return 'bi-shield-exclamation text-danger';
      case 'accident': return 'bi-car-front-fill text-warning';
      case 'health': return 'bi-heart-pulse-fill text-danger';
      case 'fire': return 'bi-fire text-danger';
      case 'evacuation': return 'bi-house-exclamation text-warning';
      default: return 'bi-exclamation-triangle-fill text-secondary';
    }
  };

  const getAlertTypeCounts = () => {
    const counts = {
      all: alerts.length,
      critical: alerts.filter(a => a.severity === 'critical').length,
      high: alerts.filter(a => a.severity === 'high').length,
      medium: alerts.filter(a => a.severity === 'medium').length,
      low: alerts.filter(a => a.severity === 'low').length,
      nearby: userLocation ? alerts.filter(alert => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          alert.latitude,
          alert.longitude
        );
        return distance <= 50;
      }).length : 0
    };
    return counts;
  };

  const alertTypeCounts = getAlertTypeCounts();

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    // In a real app, this would open a modal or navigate to a details page
    alert(`Alert Details:\n\nTitle: ${alert.title}\nDescription: ${alert.description}\nLocation: ${alert.location}\nSeverity: ${alert.severity}\nType: ${alert.type}\nReported: ${new Date(alert.createdAt).toLocaleString()}`);
  };

  const getUniqueTypes = () => {
    const types = alerts.map(a => a.type);
    return [...new Set(types)];
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h2">Emergency Alerts</h1>
        <p className="text-muted">Stay informed about active emergencies in your area</p>
      </div>

      {/* Alert Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">All Alerts</h5>
              <h3 className="text-primary">{alertTypeCounts.all}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Critical</h5>
              <h3 className="text-danger">{alertTypeCounts.critical}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">High</h5>
              <h3 className="text-warning">{alertTypeCounts.high}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Medium</h5>
              <h3 className="text-info">{alertTypeCounts.medium}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Low</h5>
              <h3 className="text-success">{alertTypeCounts.low}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Near You</h5>
              <h3 className="text-info">{alertTypeCounts.nearby}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Filter by Severity</label>
              <select 
                className="form-select" 
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Filter by Type</label>
              <select 
                className="form-select" 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                {getUniqueTypes().map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Filter by Location</label>
              <select 
                className="form-select" 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="nearby">Near Me (50 miles)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
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
              {filteredAlerts.length > 0 ? (
                <div className="list-group list-group-flush">
                  {filteredAlerts.map((alert) => (
                    <div key={alert.id} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <i className={`bi ${getAlertIcon(alert.type)} fs-3`}></i>
                        </div>
                        <div className="col-md-4">
                          <h6 className="mb-1">{alert.title}</h6>
                          <p className="mb-0 text-muted small">
                            <i className="bi bi-geo-alt me-1"></i> {alert.location}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1">{alert.description.substring(0, 100)}{alert.description.length > 100 ? '...' : ''}</p>
                          <p className="mb-0 text-muted small">
                            Reported: {new Date(alert.createdAt).toLocaleDateString()} at {new Date(alert.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                        <div className="col-md-2">
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <div className="col-md-2 text-end">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewDetails(alert)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-bell-slash fs-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No Active Alerts</h5>
                  <p className="text-muted">
                    {alerts.length === 0 
                      ? "There are no active emergency alerts at this time." 
                      : "No alerts match your current filters."}
                  </p>
                  {(alerts.length > 0 && filteredAlerts.length === 0) && (
                    <button 
                      className="btn btn-outline-secondary mt-2"
                      onClick={() => {
                        setSeverityFilter('all');
                        setTypeFilter('all');
                        setLocationFilter('all');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Alert Instructions */}
      <div className="card mt-4 border-info">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">What to Do During an Emergency</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6><i className="bi bi-shield-check text-success me-2"></i>Stay Informed</h6>
              <p>Monitor this page for updates and follow instructions from local authorities.</p>
              
              <h6><i className="bi bi-house-door text-success me-2"></i>Stay Safe</h6>
              <p>If an alert affects your area, follow evacuation orders or shelter-in-place instructions.</p>
            </div>
            <div className="col-md-6">
              <h6><i className="bi bi-telephone text-success me-2"></i>Emergency Contacts</h6>
              <p>For immediate assistance, call emergency services or use the Request Help feature.</p>
              
              <h6><i className="bi bi-info-circle text-success me-2"></i>Help Others</h6>
              <p>If you're safe and able, consider volunteering to help those in need.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlertsPage;