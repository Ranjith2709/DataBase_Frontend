// Home.js
import React from "react";
import "./Home.css";
import StorageSlider from "./StorageSlider";
import mainpic from "./assets/mainpic.jpg";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={mainpic} alt="Data Recovery Hero" className="hero-image" />
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
            {/* Card 1 */}
            <div className="database-card">
              <img src={image3} alt="Database Service 1" className="card-img" />
              <div className="card-text">
                <strong>Data Center</strong>
                <p>
                  The Core Infrastructure Powering Digital Operations. A data
                  center is a specialized facility that houses a large...
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="database-card">
              <img src={image2} alt="Database Service 2" className="card-img" />
              <div className="card-text">
                <strong>Data Store</strong>
                <p>
                  Reliable, and quick access to the enormous amounts of data
                  produced and used by contemporary services and applications.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="database-card">
              <img src={image1} alt="Database Service 3" className="card-img" />
              <div className="card-text">
                <strong>Data Restore</strong>
                <p>
                  A key element of a data center's resilience plan, protecting
                  the digital resources that businesses rely on.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="database-card">
              <img src={image4} alt="Database Service 4" className="card-img" />
              <div className="card-text">
                <strong>Data Disaster Recovery</strong>
                <p>
                  Ensures business continuity and minimizes downtime during
                  unexpected failures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Storage Selection</h2>
          <StorageSlider />
        </section>
      </main>
    </div>
  );
};

export default Home;