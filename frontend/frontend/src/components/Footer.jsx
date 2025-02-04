import React from 'react';
import '../styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: sunilkarki670@gmail.com</p>
          <p>Phone: 9811317964</p>
        </div>
        <div className="footer-section">
          <h3>Office Locations</h3>
          <p>Head Office: Kalanki, Kathmandu , Nepal</p>
          <p>Branch Office: Near Bus stand, Biratngar , Nepal</p>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Job Platform is a leading job portal helping  students with the available jobs. </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Job Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;