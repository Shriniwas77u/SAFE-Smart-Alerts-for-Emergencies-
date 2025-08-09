import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleReportEmergency = () => {
        if (isAuthenticated()) {
            navigate('/alerts');
        } else {
            navigate('/login');
        }
    };

    const handleGetHelp = () => {
        if (isAuthenticated()) {
            navigate('/help-requests');
        } else {
            navigate('/login');
        }
    };

    const handleDonate = () => {
        if (isAuthenticated()) {
            navigate('/donate');
        } else {
            navigate('/login', { state: { redirectTo: '/donate' } });
        }
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
        <Container fluid className="home-bg p-0">
            <div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh', background: 'rgba(211,47,47,0.7)', position: 'relative' }}>
                <div style={{ zIndex: 2 }}>
                    <h1 className="display-2 fw-bold mb-2" style={{ textShadow: '2px 2px 8px #000' }}>SAFE</h1>
                    <h2 className="fw-light mb-3" style={{ textShadow: '1px 1px 6px #222' }}>Smart Alert For Emergencies</h2>
                    <p className="lead mb-4" style={{ textShadow: '1px 1px 4px #333' }}>Emergency coordination, monitoring, and management system for natural disasters, accidents, and crisis situations. Quick response through centralized resource allocation.</p>
                    <Button variant="light" size="lg" className="fw-bold px-4 py-2 shadow" onClick={handleReportEmergency} style={{ color: '#d32f2f', borderRadius: '30px', fontSize: '1.3rem' }}>Report Emergency</Button>
                </div>
                <div className="hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.25)', zIndex: 1 }}></div>
            </div>

            <Container className="mt-n5 position-relative" style={{ zIndex: 3 }}>
                <Row className="g-4 justify-content-center">
                    <Col md={4} sm={6} xs={12}>
                        <Card className="h-100 shadow border-0 home-action-card" style={{ borderRadius: '18px', background: 'rgba(255,255,255,0.95)' }}>
                            <Card.Body className="text-center">
                                <div className="text-primary mb-3">
                                    <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <Card.Title className="fw-bold">Report Emergency</Card.Title>
                                <Card.Text>
                                    Quickly report emergencies with location details and request immediate assistance.
                                </Card.Text>
                                <Button variant="danger" size="lg" style={{ borderRadius: '30px', fontWeight: '600' }} onClick={handleReportEmergency}>Report Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={6} xs={12}>
                        <Card className="h-100 shadow border-0 home-action-card" style={{ borderRadius: '18px', background: 'rgba(255,255,255,0.95)' }}>
                            <Card.Body className="text-center">
                                <div className="text-success mb-3">
                                    <i className="bi bi-hand-thumbs-up-fill" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <Card.Title className="fw-bold">Request Help</Card.Title>
                                <Card.Text>
                                    Submit help requests for medical aid, shelter, food, or transportation assistance.
                                </Card.Text>
                                <Button variant="primary" size="lg" style={{ borderRadius: '30px', fontWeight: '600' }} onClick={handleGetHelp}>Get Help</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={6} xs={12}>
                        <Card className="h-100 shadow border-0 home-action-card" style={{ borderRadius: '18px', background: 'rgba(255,255,255,0.95)' }}>
                            <Card.Body className="text-center">
                                <div className="text-warning mb-3">
                                    <i className="bi bi-heart-fill" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <Card.Title className="fw-bold">Donate</Card.Title>
                                <Card.Text>
                                    Contribute to emergency relief efforts with monetary donations or resource supplies.
                                </Card.Text>
                                <Button variant="success" size="lg" style={{ borderRadius: '30px', fontWeight: '600' }} onClick={handleDonate}>Donate</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={12}>
                        <Alert variant="warning" className="text-center shadow-sm" style={{ borderRadius: '18px', fontWeight: '500', fontSize: '1.1rem', background: 'rgba(255,255,224,0.95)' }}>
                            <Alert.Heading style={{ fontWeight: '700', color: '#d32f2f' }}>Emergency Status: Normal</Alert.Heading>
                            <p>No active emergency alerts in your area. Stay prepared and informed.</p>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home;