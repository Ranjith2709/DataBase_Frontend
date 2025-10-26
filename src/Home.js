import React, { useRef } from "react";
import "./Home.css";
import StorageSlider from "./StorageSlider";
import HomePage from "./assets/HomePage.jpg";
import GoogleMobile from "./assets/GoogleMobile.jpg";
import GoogleLap from "./assets/GoogleLap.jpg";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";

const Home = ({ user }) => {
  // ✅ Accept user as a prop
  // Create a ref for the StorageSlider section
  const storageRef = useRef(null);

  // Function to scroll to StorageSlider
  const scrollToStorage = () => {
    if (storageRef.current) {
      storageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={HomePage} alt="Data Recovery Hero" className="hero-image" />
        <div className="hero-text">
          <h3>FLEXINODE Expert Data Recovery Services</h3>
          <p>
            We provide industry-leading solutions for secure data recovery,
            backup, and disaster management to keep your business running
            without interruption.
          </p>
        </div>
      </section>

      <h1>
        <center>TALES OF DATA</center>
      </h1>

      <main className="home-content">
        <section className="database-section">
          <div className="database-grid">
            {/* Database cards */}
            <div className="database-card">
              <img src={image3} alt="Database Service 1" className="card-img" />
              <div className="card-text">
                <strong>Data Center</strong>
                <p>The Core Infrastructure Powering Digital Operations...</p>
              </div>
            </div>
            <div className="database-card">
              <img src={image2} alt="Database Service 2" className="card-img" />
              <div className="card-text">
                <strong>Data Store</strong>
                <p>
                  Reliable, and quick access to data for modern applications.
                </p>
              </div>
            </div>
            <div className="database-card">
              <img src={image1} alt="Database Service 3" className="card-img" />
              <div className="card-text">
                <strong>Data Restore</strong>
                <p>Protecting the digital resources businesses rely on.</p>
              </div>
            </div>
            <div className="database-card">
              <img src={image4} alt="Database Service 4" className="card-img" />
              <div className="card-text">
                <strong>Data Disaster Recovery</strong>
                <p>Ensures business continuity during unexpected failures.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section">
          <h2>OUR SERVICES</h2>

          <div className="services-grid">
            {/* Full-width horizontal image */}
            <div className="service-card full-width" onClick={scrollToStorage}>
              <img src={image1} alt="Service 1" />
              <div className="service-text">
                <strong>Service One</strong>
                <p>
                  Description for Service One. Highlight the features and
                  benefits.
                </p>
              </div>
            </div>

            {/* Two half-width images side by side */}
            <div className="half-row">
              <div
                className="service-card half-width"
                onClick={scrollToStorage}
              >
                <img src={image2} alt="Service 2" />
                <div className="service-text">
                  <strong>Service Two</strong>
                  <p>Description for Service Two. Brief but informative.</p>
                </div>
              </div>

              <div
                className="service-card half-width"
                onClick={scrollToStorage}
              >
                <img src={image3} alt="Service 3" />
                <div className="service-text">
                  <strong>Service Three</strong>
                  <p>Description for Service Three. Brief but informative.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storage Selection Section */}
        <section ref={storageRef}>
          <h2>Storage Selection</h2>
          {/* ✅ Pass user as prop */}
          <StorageSlider uid={user.uid} user={user} />
        </section>
      </main>
    </div>
  );
};

export default Home;
