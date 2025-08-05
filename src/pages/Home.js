import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import './Home.css';

const Home = () => {
  const howItWorksSteps = [
    {
      icon: '📱',
      title: 'Report Incident',
      description: 'Quickly report emergencies with location and details'
    },
    {
      icon: '🚨',
      title: 'Receive Alerts',
      description: 'Get real-time notifications about nearby emergencies'
    },
    {
      icon: '🤝',
      title: 'Get Help',
      description: 'Connect with volunteers and emergency responders'
    }
  ];

  const features = [
    {
      title: 'Verified Response Teams',
      description: 'Professional emergency responders and trained volunteers',
      icon: '✅'
    },
    {
      title: 'Real-Time Alert System',
      description: 'Instant notifications to keep you informed and safe',
      icon: '⚡'
    },
    {
      title: 'Secure Donations',
      description: 'Transparent donation system for disaster relief',
      icon: '🔒'
    },
    {
      title: 'Connected Volunteer Network',
      description: 'Large network of volunteers ready to help',
      icon: '🌐'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Community Member',
      text: 'SAFE Portal helped me get immediate help during the flood. The response was incredible!'
    },
    {
      name: 'Dr. Priya Verma',
      role: 'Emergency Physician',
      text: 'As a first responder, this platform helps us coordinate better and reach people faster.'
    },
    {
      name: 'Anjali Singh',
      role: 'Volunteer Coordinator',
      text: 'The volunteer network is amazing. We can mobilize help quickly and efficiently.'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Be Alert. Act Fast. Stay Safe with SAFE Portal
              </h1>
              <p className="lead mb-4">
                Emergency communication to protect lives in real time.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link 
                  to="/victim/request-help" 
                  className="btn btn-danger btn-lg btn-emergency"
                >
                  Report Emergency
                </Link>
                <Link 
                  to="/victim/alerts" 
                  className="btn btn-outline-light btn-lg"
                >
                  View Alerts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">How It Works</h2>
              <p className="text-muted">Simple steps to stay safe and help others</p>
            </div>
          </div>
          <div className="row">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="col-md-4 text-center mb-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>
                  {step.icon}
                </div>
                <h4>{step.title}</h4>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SAFE Portal */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">Why SAFE Portal?</h2>
              <p className="text-muted">Trusted by communities worldwide</p>
            </div>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                      {feature.icon}
                    </div>
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2 className="fw-bold">What People Say</h2>
              <p className="text-muted">Real stories from our community</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center p-5">
                          <blockquote className="blockquote mb-4">
                            <p>"{testimonial.text}"</p>
                          </blockquote>
                          <footer className="blockquote-footer">
                            <strong>{testimonial.name}</strong>, {testimonial.role}
                          </footer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">
                <span className="text-danger">SAFE</span> Portal
              </h5>
              <p> Emergency response system protecting communities worldwide.</p>
            </div>
            <div className="col-md-2 mb-4">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/victim/alerts" className="text-light text-decoration-none">Alerts</Link></li>
                <li><Link to="/victim/donations" className="text-light text-decoration-none">Donate</Link></li>
                <li><Link to="/login" className="text-light text-decoration-none">Login</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6>Contact</h6>
              <p className="mb-1">📧 help@safeportal.org</p>
              <p className="mb-1">📞 +91 9876543210</p>
              <p>🏢 123 Emergency , Pune</p>
            </div>
            <div className="col-md-3 mb-4">
              <h6>Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-light">📘</a>
                <a href="#" className="text-light">🐦</a>
                <a href="#" className="text-light">📷</a>
                <a href="#" className="text-light">💼</a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col text-center">
              <p className="mb-0">&copy; 2024 SAFE Portal. All rights reserved. | 
                <a href="#" className="text-light text-decoration-none"> Privacy Policy</a> | 
                <a href="#" className="text-light text-decoration-none"> Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;