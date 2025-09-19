import React, { useState } from "react";
import { auth } from "./firebase";
import "./Home.css";
import StorageSlider from "./StorageSlider";
import bgImage from "./assets/background.jpg"; 
import logo from "./assets/background2.jpg"; 
// for database options
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";
import image5 from "./assets/image5.jpg";

const Home = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = () => {
    if (user.displayName) {
      const names = user.displayName.split(" ");
      return (
        (names[0][0] || "").toUpperCase() +
        (names[1]?.[0] || "").toUpperCase()
      );
    }
    return (
      (user.email[0] || "").toUpperCase() +
      (user.email[1] || "").toUpperCase()
    );
  };

  return (
    <div className="home-container">
      <header className="home-header">
        {/* Left: Logo */}
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="logo" />
        </div>

        {/* Right: User Info */}
        <div className="user-info">
          <span className="user-name">{user.displayName || user.email}</span>
          <div className="avatar-container">
            <div className="generic-avatar" onClick={toggleDropdown}>
              {getInitials()}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-row">
                  <span className="dropdown-item" onClick={signOut}>
                    Sign out
                  </span>
                  <span className="close-btn" onClick={closeDropdown}>
                    ×
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Moved the title here */}
      <h2 className="main-title">FLEXINODE Expert Data Recovery Services</h2>
      
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