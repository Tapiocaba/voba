import React from 'react';

import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4><b>About Us</b></h4>
          <p>We simplify vocabulary learning for younger students! </p>
          <p>Created for TreeHacks 2024</p>
        </div>
        <div className="footer-section">
          <h4><b> Contact Us </b></h4>
          <p>Email: contact@voba.com</p>
          <a href="#">Facebook</a> | <a href="#">X</a> | <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} www.voba.com | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
