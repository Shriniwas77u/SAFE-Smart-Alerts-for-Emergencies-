import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, Table } from 'react-bootstrap';

function HelpRequests() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newRequest, setNewRequest] = useState({
        type: 'Medical',
        description: '',
        urgency: 'Medium',
        location: '',
        contactInfo: ''
    });

    // Mock help requests data
    const [requests, setRequests] = useState([
        {
            id: 1,
            type: "Medical",
            description: "Elderly person needs immediate medical attention - chest pain",
            urgency: "High",
            location: "123 Main St, Downtown",
            requester: "John Doe",
            contactInfo: "+1-555-0123",
            status: "Assigned",
            createdAt: "2024-01-15 15:30",
            assignedTo: "Dr. Smith - Mobile Unit 1"
        },
        {
            id: 2,
            type: "Shelter",
            description: "Family of 4 needs temporary housing due to flood damage",
            urgency: "Medium",
            location: "456 Oak St, North District",
            requester: "Sarah Johnson",
            contactInfo: "+1-555-0456",
            status: "Pending",
            createdAt: "2024-01-15 14:15",
            assignedTo: null
        },
        {
            id: 3,
            type: "Food",
            description: "Elderly couple needs food supplies - unable to leave home",
            urgency: "Low",
            location: "789 Pine Ave, South Area",
            requester: "Robert Williams",
            contactInfo: "+1-555-0789",
            status: "Completed",
            createdAt: "2024-01-15 12:00",
            assignedTo: "Community Volunteer Team"
        },
        {
            id: 4,
            type: "Transportation",
            description: "Pregnant woman needs transport to hospital",
            urgency: "High",
            location: "321 Elm St, West Side",
            requester: "Maria Garcia",
            contactInfo: "+1-555-0321",
            status: "In Progress",
            createdAt: "2024-01-15 16:45",
            assignedTo: "Emergency Transport Unit 3"
        }
    ]);

    const handleCreateRequest = () => {
        const request = {
            id: requests.length + 1,
            ...newRequest,
            requester: "Current User", // In real app, this would come from auth
            status: "Pending",
            createdAt: new Date().toLocaleString(),
            assignedTo: null
        };
        setRequests([request, ...requests]);
        setNewRequest({
            type: 'Medical',
            description: '',
            urgency: 'Medium',
            location: '',
            contactInfo: ''
        });
        setShowCreateModal(false);
    };

    const getUrgencyVariant = (urgency) => {
        switch (urgency) {
            case 'High': return 'danger';
            case 'Medium': return 'warning';
            case 'Low': return 'info';
            default: return 'secondary';
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'Assigned': return 'info';
            case 'In Progress': return 'primary';
            case 'Completed': return 'success';
            default: return 'secondary';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Medical': return 'bi-heart-pulse';
            case 'Shelter': return 'bi-house';
            case 'Food': return 'bi-cup-straw';
            case 'Transportation': return 'bi-car-front';
            case 'Rescue': return 'bi-life-preserver';
            default: return 'bi-question-circle';
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="text-primary">Help Requests</h1>
                            <p className="text-muted">Submit and manage emergency assistance requests</p>
                        </div>
                        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                            <i className="bi bi-plus-circle me-2"></i>
                            Request Help
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Summary Stats */}
            <Row className="mb-4">
                <Col md={3} className="mb-2">
                    <Card className="text-center border-warning">
                        <Card.Body>
                            <h3 className="text-warning">{requests.filter(r => r.status === 'Pending').length}</h3>
                            <small className="text-muted">Pending</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-2">
                    <Card className="text-center border-primary">
                        <Card.Body>
                            <h3 className="text-primary">{requests.filter(r => r.status === 'In Progress').length}</h3>
                            <small className="text-muted">In Progress</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-2">
                    <Card className="text-center border-info">
                        <Card.Body>
                            <h3 className="text-info">{requests.filter(r => r.status === 'Assigned').length}</h3>
                            <small className="text-muted">Assigned</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-2">
                    <Card className="text-center border-success">
                        <Card.Body>
                            <h3 className="text-success">{requests.filter(r => r.status === 'Completed').length}</h3>
                            <small className="text-muted">Completed</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Requests List */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header>
                            <h5 className="mb-0">All Help Requests</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive hover className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Urgency</th>
                                        <th>Location</th>
                                        <th>Requester</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(request => (
                                        <tr key={request.id}>
                                            <td>
                                                <i className={`bi ${getTypeIcon(request.type)} me-2 text-primary`}></i>
                                                {request.type}
                                            </td>
                                            <td>
                                                <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                                    {request.description}
                                                </div>
                                            </td>
                                            <td>
                                                <Badge bg={getUrgencyVariant(request.urgency)}>
                                                    {request.urgency}
                                                </Badge>
                                            </td>
                                            <td>
                                                <small className="text-muted">{request.location}</small>
                                            </td>
                                            <td>{request.requester}</td>
                                            <td>
                                                <Badge bg={getStatusVariant(request.status)}>
                                                    {request.status}
                                                </Badge>
                                                {request.assignedTo && (
                                                    <div>
                                                        <small className="text-muted">
                                                            Assigned to: {request.assignedTo}
                                                        </small>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <small className="text-muted">{request.createdAt}</small>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <Button variant="outline-primary" size="sm">
                                                        <i className="bi bi-eye"></i>
                                                    </Button>
                                                    <Button variant="outline-secondary" size="sm">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Create Help Request Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Submit Help Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Request Type</Form.Label>
                                    <Form.Select
                                        value={newRequest.type}
                                        onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                                    >
                                        <option value="Medical">Medical Emergency</option>
                                        <option value="Shelter">Shelter/Housing</option>
                                        <option value="Food">Food & Supplies</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Rescue">Rescue Operation</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Urgency Level</Form.Label>
                                    <Form.Select
                                        value={newRequest.urgency}
                                        onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                                    >
                                        <option value="Low">Low - Can wait several hours</option>
                                        <option value="Medium">Medium - Needed within 2-3 hours</option>
                                        <option value="High">High - Immediate attention required</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newRequest.description}
                                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                                placeholder="Provide detailed description of help needed"
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={newRequest.location}
                                onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                                placeholder="Enter your current location or address"
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control
                                type="text"
                                value={newRequest.contactInfo}
                                onChange={(e) => setNewRequest({...newRequest, contactInfo: e.target.value})}
                                placeholder="Phone number or emergency contact"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateRequest}>
                        Submit Request
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default HelpRequests;