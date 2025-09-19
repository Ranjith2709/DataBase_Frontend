import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContactPage.css";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Better yet, see us in person! We love our customers, so feel free to visit during normal business hours.</p>
      </div>

      <div className="contact-card">
        <h2>FLEXINODE</h2>
        <p className="address">
          Sai Rushidhar Konireddy, Mullapudi Road, Nallamanikalava, Thanapalle, Tirupati, Andhra Pradesh, India
        </p>
        
        <p className="phone">📞 <a href="tel:8886347428">8886347428</a></p>

        <p className="email">
          📧 <a href="mailto:ranjithraju2709@gmail.com" target="_blank" rel="noopener noreferrer">
            ranjithraju2709@gmail.com
          </a>
        </p>

        <h2>Hours</h2>
        <p>Open today: <span className="hours-info">09:00 am – 05:00 pm</span></p>
      </div>

      {/* Back button at the bottom */}
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
