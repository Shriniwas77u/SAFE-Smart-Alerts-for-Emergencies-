import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleReportEmergency = () => {
        if (isAuthenticated()) {
            // Navigate to alerts page to create new alert
            navigate('/alerts');
        } else {
            // Redirect to login first
            navigate('/login');
        }
    };

    const handleGetHelp = () => {
        if (isAuthenticated()) {
            // Navigate to help requests page
            navigate('/help-requests');
        } else {
            // Redirect to login first
            navigate('/login');
        }
    };

    const handleDonate = () => {
        // For now, show an alert - this will be implemented in Phase 2
        alert('Donation feature coming soon! This will allow you to contribute to emergency relief efforts.');
    };

    const handleQuickAction = (action) => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        
        switch (action) {
            case 'checkin':
                alert('Check-in Safe feature coming soon! This will allow you to mark yourself as safe during emergencies.');
                break;
            case 'shelters':
                alert('View Shelters feature coming soon! This will show nearby emergency shelters and their capacity.');
                break;
            case 'contacts':
                alert('Emergency Contacts feature coming soon! This will provide local emergency service numbers.');
                break;
            case 'guidelines':
                alert('Safety Guidelines feature coming soon! This will provide emergency preparedness information.');
                break;
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-danger">SAFE</h1>
                        <p className="lead text-muted">Smart Alert For Emergencies</p>
                        <hr className="my-4" />
                        <p>
                            Emergency coordination, monitoring, and management system for natural disasters, 
                            accidents, and crisis situations. Quick response through centralized resource allocation.
                        </p>
                    </div>
                </Col>
            </Row>
            
            <Alert variant="warning" className="mb-4">
                <Alert.Heading>Emergency Status: Normal</Alert.Heading>
                <p>No active emergency alerts in your area. Stay prepared and informed.</p>
            </Alert>
            
            <Row>
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <div className="text-primary mb-3">
                                <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <Card.Title>Report Emergency</Card.Title>
                            <Card.Text>
                                Quickly report emergencies with location details and request immediate assistance.
                            </Card.Text>
                            <Button variant="danger" size="lg" onClick={handleReportEmergency}>Report Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <div className="text-success mb-3">
                                <i className="bi bi-hand-thumbs-up-fill" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <Card.Title>Request Help</Card.Title>
                            <Card.Text>
                                Submit help requests for medical aid, shelter, food, or transportation assistance.
                            </Card.Text>
                            <Button variant="primary" size="lg" onClick={handleGetHelp}>Get Help</Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <div className="text-warning mb-3">
                                <i className="bi bi-heart-fill" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <Card.Title>Donate</Card.Title>
                            <Card.Text>
                                Contribute to emergency relief efforts with monetary donations or resource supplies.
                            </Card.Text>
                            <Button variant="success" size="lg" onClick={handleDonate}>Donate</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mt-5">
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <h5>Quick Actions</h5>
                            <div className="d-flex gap-2 flex-wrap">
                                <Button variant="outline-primary" size="sm" onClick={() => handleQuickAction('checkin')}>Check-in Safe</Button>
                                <Button variant="outline-secondary" size="sm" onClick={() => handleQuickAction('shelters')}>View Shelters</Button>
                                <Button variant="outline-info" size="sm" onClick={() => handleQuickAction('contacts')}>Emergency Contacts</Button>
                                <Button variant="outline-warning" size="sm" onClick={() => handleQuickAction('guidelines')}>Safety Guidelines</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;