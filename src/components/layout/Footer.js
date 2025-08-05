import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="text-uppercase fw-bold mb-3">SAFE Portal</h5>
            <p className="text-muted">
              Smart Alert For Emergencies - Connecting those in need with volunteers and resources during critical situations.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-muted text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-muted text-decoration-none">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/volunteer" className="text-muted text-decoration-none">Become a Volunteer</a>
              </li>
              <li>
                <a href="/donate" className="text-muted text-decoration-none">Donate</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/help" className="text-muted text-decoration-none">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/safety" className="text-muted text-decoration-none">Safety Tips</a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-muted text-decoration-none">Blog</a>
              </li>
              <li>
                <a href="/faq" className="text-muted text-decoration-none">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3">
            <h6 className="text-uppercase fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/privacy" className="text-muted text-decoration-none">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="/cookies" className="text-muted text-decoration-none">Cookie Policy</a>
              </li>
              <li>
                <a href="/accessibility" className="text-muted text-decoration-none">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center text-md-start mb-3 mb-md-0">
            <span className="text-muted">&copy; {currentYear} SAFE Portal. All rights reserved.</span>
          </div>
          <div className="text-center text-md-end">
            <a href="#" className="text-muted text-decoration-none me-3">Emergency Contacts</a>
            <a href="#" className="text-muted text-decoration-none">Report an Issue</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;