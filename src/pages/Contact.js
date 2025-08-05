import React, { useState } from 'react';
import { Card, Button, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Plus,
  Star,
  Clock,
  Users
} from 'lucide-react';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
 const emergencyContacts = [
  {
    name: "Fire Brigade - Station 1",
    organization: "Pune Fire Department",
    role: "Primary Fire Response",
    phone: "101",
    directPhone: "020-2645-1234",
    email: "fire@pmc.gov.in",
    address: "Fire Station, Bhawani Peth, Pune",
    status: "Active",
    priority: "Critical",
    responseTime: "5 min",
    availability: "24/7"
  },
  {
    name: "Police Control Room",
    organization: "Pune Police Department",
    role: "Law Enforcement",
    phone: "100",
    directPhone: "020-2612-2000",
    email: "controlroom@punepolice.gov.in",
    address: "Police HQ, Shivajinagar, Pune",
    status: "Active",
    priority: "Critical",
    responseTime: "4 min",
    availability: "24/7"
  },
  {
    name: "Emergency Medical Services",
    organization: "PMC EMS",
    role: "Medical Emergency Response",
    phone: "108",
    directPhone: "020-2550-4444",
    email: "ems@pmchealth.in",
    address: "PMC HQ, Shivajinagar, Pune",
    status: "Active",
    priority: "Critical",
    responseTime: "6 min",
    availability: "24/7"
  },
  {
    name: "Hospital Emergency Department",
    organization: "Sassoon General Hospital",
    role: "Emergency Medical Care",
    phone: "020-2612-7300",
    directPhone: "020-2612-7301",
    email: "emergency@sassoongh.org",
    address: "Near Pune Railway Station, Pune",
    status: "Active",
    priority: "High",
    responseTime: "N/A",
    availability: "24/7"
  }
];

  
  const utilityContacts = [
  {
    name: "Gas Leak Emergency",
    organization: "Maharashtra Natural Gas Ltd (MNGL)",
    role: "Gas Emergency Response",
    phone: "1906",
    directPhone: "020-2561-1000",
    email: "emergency@mngl.in",
    address: "MNGL House, Shivajinagar, Pune",
    status: "Active",
    priority: "High",
    responseTime: "20 min",
    availability: "24/7"
  },
  {
    name: "Electricity Complaint",
    organization: "MSEDCL Pune",
    role: "Electrical Emergency",
    phone: "1912",
    directPhone: "020-2619-3100",
    email: "support@mahadiscom.in",
    address: "Rasta Peth, Pune",
    status: "Active",
    priority: "High",
    responseTime: "25 min",
    availability: "24/7"
  },
  {
    name: "Water Supply Emergency",
    organization: "Pune Municipal Corporation",
    role: "Water Emergency",
    phone: "020-2550-1222",
    directPhone: "020-2550-1000",
    email: "water@pmc.gov.in",
    address: "PMC Water Dept, Shivajinagar, Pune",
    status: "Active",
    priority: "Medium",
    responseTime: "30 min",
    availability: "24/7"
  }
];

  
 const governmentContacts = [
  {
    name: "Disaster Management Cell",
    organization: "PMC Disaster Management",
    role: "Emergency Coordination",
    phone: "020-2550-1200",
    directPhone: "020-2550-1210",
    email: "disaster@pmc.gov.in",
    address: "PMC HQ, Shivajinagar, Pune",
    status: "Active",
    priority: "Critical",
    responseTime: "10 min",
    availability: "24/7"
  },
  {
    name: "Mayor’s Office",
    organization: "Pune Municipal Corporation",
    role: "Executive Leadership",
    phone: "020-2550-1000",
    directPhone: "020-2550-1010",
    email: "mayor@pmc.gov.in",
    address: "PMC Main Building, Shivajinagar, Pune",
    status: "Active",
    priority: "High",
    responseTime: "Business Hours",
    availability: "10 AM - 5 PM"
  }
];

  
  const allContacts = [...emergencyContacts, ...utilityContacts, ...governmentContacts];
  
  const filteredContacts = allContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-danger";
      case "High":
        return "bg-warning";
      case "Medium":
        return "bg-info";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };
  
  const ContactCard = ({ contact, index }) => (
    <Card key={index} className="mb-4 hover-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="mb-1">{contact.name}</h5>
            <p className="text-muted mb-1">{contact.organization}</p>
            <p className="mb-0">{contact.role}</p>
          </div>
          <div className="d-flex gap-2">
            <Badge className={getPriorityColor(contact.priority)}>
              {contact.priority}
            </Badge>
            {contact.priority === "Critical" && (
              <Star className="text-warning" fill="currentColor" />
            )}
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2">
              <Phone className="me-2 text-muted" size={16} />
              <span className="fw-bold me-2">Emergency:</span>
              <span>{contact.phone}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Phone className="me-2 text-muted" size={16} />
              <span className="fw-bold me-2">Direct:</span>
              <span>{contact.directPhone}</span>
            </div>
            <div className="d-flex align-items-center">
              <Mail className="me-2 text-muted" size={16} />
              <span>{contact.email}</span>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2">
              <MapPin className="me-2 text-muted" size={16} />
              <span>{contact.address}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Clock className="me-2 text-muted" size={16} />
              <span className="fw-bold me-2">Response:</span>
              <span>{contact.responseTime}</span>
            </div>
            <div className="d-flex align-items-center">
              <Users className="me-2 text-muted" size={16} />
              <span>{contact.availability}</span>
            </div>
          </div>
        </div>
        
        
      </Card.Body>
    </Card>
  );
  
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Emergency Contacts</h1>
          <p className="text-muted">Quick access to critical emergency response contacts</p>
        </div>
        <Button variant="primary">
          <Plus className="me-2" size={16} />
          Add Contact
        </Button>
      </div>
      
      {/* Search */}
      <div className="mb-4" style={{ maxWidth: '400px' }}>
        <InputGroup>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <FormControl
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      
      {/* Emergency Services Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <h2 className="me-2">Emergency Services</h2>
          <Badge bg="danger">Critical Priority</Badge>
        </div>
        <div className="row">
          {emergencyContacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((contact, index) => (
            <div key={`emergency-${index}`} className="col-lg-6">
              <ContactCard contact={contact} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Utility Services Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <h2 className="me-2">Utility Services</h2>
          <Badge bg="warning">High Priority</Badge>
        </div>
        <div className="row">
          {utilityContacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((contact, index) => (
            <div key={`utility-${index}`} className="col-lg-6">
              <ContactCard contact={contact} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Government Contacts Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <h2 className="me-2">Government & Administration</h2>
          <Badge bg="info">Coordination</Badge>
        </div>
        <div className="row">
          {governmentContacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((contact, index) => (
            <div key={`government-${index}`} className="col-lg-6">
              <ContactCard contact={contact} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {filteredContacts.length === 0 && searchTerm && (
        <div className="text-center py-4">
          <p className="text-muted">No contacts found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;