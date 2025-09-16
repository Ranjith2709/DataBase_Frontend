import React, { useState } from "react";
import { auth } from "./firebase";
import "./Home.css";
import StorageSlider from "./StorageSlider";
 
const Home = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
 
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };
 
  // Generate first two letters from name or email
  const getInitials = () => {
    if (user.displayName) {
      const names = user.displayName.split(" ");
      return (
        (names[0][0] || "").toUpperCase() +
        (names[1]?.[0] || "").toUpperCase()
      );
    }
    return (user.email[0] || "").toUpperCase() + (user.email[1] || "").toUpperCase();
  };
 
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="user-info">
          <span className="user-name">{user.displayName || user.email}</span>
          <div className="avatar-container">
            <div className="generic-avatar" onClick={toggleDropdown}>
              {getInitials()}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-row">
                  <span className="dropdown-item" onClick={signOut}>Sign out</span>
                  <span className="close-btn" onClick={closeDropdown}>×</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    <main className="home-content">
  <h1>Welcome to Home Page</h1>
  <p>This is a secure page for logged-in users.</p>

  <section className="database-section">
    <h2>Our Database Services</h2>

    <div className="database-option">
      <p><strong>Option 1 – Simple Professional Statement:</strong> We offer high-quality database services tailored to client needs. Our pricing is structured at ₹30 per GB, providing a cost-effective solution for businesses seeking reliable and scalable data storage and access.</p>
    </div>

    <div className="database-option">
      <p><strong>Option 2 – More Elaborate and Persuasive:</strong> We provide premium database solutions designed to meet the unique requirements of our clients. Our service ensures secure, organized, and easily accessible data, enabling efficient business operations. The pricing is set at ₹30 per GB, offering an affordable and scalable option for businesses of all sizes.</p>
    </div>

    <div className="database-option">
      <p><strong>Option 3 – For Proposal or Contract:</strong> Our company supplies comprehensive database services at a rate of ₹30 per GB. This pricing model ensures transparency and flexibility, allowing clients to scale their data usage according to business needs while benefiting from a secure and high-performance database infrastructure.</p>
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
 
 