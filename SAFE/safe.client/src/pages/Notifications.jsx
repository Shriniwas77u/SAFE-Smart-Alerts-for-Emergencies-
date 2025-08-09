import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert as RBAlert, Spinner } from 'react-bootstrap';
import api from '../services/api';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/notifications/my');
            setNotifications(res.data);
        } catch {
            setError('Failed to fetch notifications.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Unread': return 'warning';
            case 'Pending': return 'info';
            case 'Sent': return 'success';
            case 'Failed': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h1 className="text-primary">Notifications</h1>
                    <p className="text-muted">All system notifications for your account</p>
                </Col>
            </Row>
            {error && <RBAlert variant="danger">{error}</RBAlert>}
            {loading ? (
                <div className="text-center my-5"><Spinner animation="border" /></div>
            ) : (
                <Row>
                    {notifications.length === 0 ? (
                        <Col><RBAlert variant="info">No notifications found.</RBAlert></Col>
                    ) : notifications.map(n => (
                        <Col md={6} key={n.notificationId} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header>
                                    <Badge bg={getStatusVariant(n.status)} className="me-2">{n.status}</Badge>
                                    <span className="text-muted">{n.type}</span>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{n.message}</Card.Title>
                                    <Card.Text>
                                        <small className="text-muted">Created: {new Date(n.createdDate).toLocaleString()}</small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Notifications;
