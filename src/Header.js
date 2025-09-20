// Header.js 🆕
import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/fnlogo.jpg";
import "./Header.css"; // 🆕 Create this CSS file for styling

const Header = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/"); // or navigate("/auth");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminTap = () => {
    setShowPasswordModal(true);
    setPassword("");
    setError("");
  };

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

  const getInitials = () => {
    if (user.displayName) {
      const names = user.displayName.split(" ");
      return (
        (names[0]?.[0] || "").toUpperCase() +
        (names[1]?.[0] || "").toUpperCase()
      );
    }
    return (user.email?.[0] || "").toUpperCase(); // Just get the first initial for email
  };

  return (
    <>
      <header className="home-header">
        {/* Left: Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="App Logo" className="logo" />
          </Link>
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

      {/* Password Modal */}
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
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
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
    </>
  );
};

export default Header;
