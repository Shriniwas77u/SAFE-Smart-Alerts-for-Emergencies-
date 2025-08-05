import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "Shrinivas Sirsat",
      role: "Project Lead",
      
     
    },
    {
      name: "Gaurav Baviskar",
      role: "Project Member",
      
      
    },
    {
      name: "Krutika Salunke ",
      role: "Project Member",
      
      
    },
    {
      name: "Shreyas Londhe",
      role: "Project Member",
      
    }
  ];



  const partners = [
    { name: "Red Cross", logo: "🏥" },
    { name: "FEMA", logo: "🚨" },
    { name: "UN OCHA", logo: "🌍" },
    { name: "Local Governments", logo: "🏛️" },
    { name: "Tech Companies", logo: "💻" },
    { name: "NGOs", logo: "🤝" }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="about-hero-title">About SAFE Portal</h1>
              <p className="about-hero-subtitle">
                We're on a mission to save lives through innovative emergency response technology.
                Our platform connects people in need with help faster than ever before.
              </p>
              <div className="about-hero-buttons">
                <Link to="/victim/request-help" className="btn btn-danger btn-lg me-3">
                  Get Help Now
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-hero-image">
                <div className="about-image-placeholder">
                  <span className="about-image-icon">🚨</span>
                  <p>Emergency Response in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">Making emergency response faster, smarter, and more accessible</p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">⚡</div>
                <h3>Speed</h3>
                <p>Reduce emergency response time by 50% through AI-powered dispatch and real-time communication.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">🌐</div>
                <h3>Accessibility</h3>
                <p>Ensure everyone has access to emergency services regardless of location, language, or ability.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">🤝</div>
                <h3>Collaboration</h3>
                <p>Connect first responders, volunteers, and affected communities in a unified response network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">Passionate professionals dedicated to emergency response</p>
          </div>
          
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="team-card">
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Partners</h2>
            <p className="section-subtitle">Working together to save lives</p>
          </div>
          
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-card">
                <div className="partner-logo">{partner.logo}</div>
                <p>{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      <Footer />
    </>
  );
};

export default About;