import React, { useState } from "react";
import { auth } from "./firebase";
import "./Home.css";
import StorageSlider from "./StorageSlider";
import bgImage from "./assets/background.jpg";
import logo from "./assets/fnlogo.jpg";
// for database options
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";
import image5 from "./assets/image5.jpg";
import mainpic from "./assets/mainpic.jpg";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 🔹 Admin modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

const handlePasswordSubmit = async () => {
  if (!password) {
    setError("Password is required");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setShowPasswordModal(false); // close modal
      navigate("/admin"); // go to admin page
    } else {
      setError("❌ Incorrect password!");
    }
  } catch (err) {
    console.error(err);
    setError("⚠️ Server error, please try again.");
  }
};


  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Show modal instead of raw prompt
  const handleAdminTap = () => {
    setShowPasswordModal(true);
    setPassword("");
    setError("");
  };

const handleAdminClick = async () => {
  const password = prompt("Enter Admin Password:");

  if (!password) return;

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      navigate("/admin");
    } else {
      alert("❌ Incorrect password!");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Server error, try again.");
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

        {/* Right: Buttons + User Info */}
        <div className="right-section">
          <nav className="nav-links">
            <button onClick={handleAdminTap} className="nav-btn">
              Admin
            </button>
            <Link to="/contact" className="nav-btn">
              Contact Us
            </Link>
          </nav>

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
        </div>
      </header>

      {/* 🔹 Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>🔒 Admin Access</h2>
            <p>Please enter the admin password to continue:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
            />
            {error && <p className="error-text">{error}</p>}
            <div className="modal-actions">
              <button
                className="modal-btn confirm"
                onClick={handlePasswordSubmit}
              >
                Submit
              </button>
              <button
                className="modal-btn cancel"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
