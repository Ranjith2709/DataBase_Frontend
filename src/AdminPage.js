import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading users...</p>
    );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <h2>All Logged-in Users</h2>
      </div>

      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>UID</th>
                <th>Storage (GB)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.uid}</td>
                  <td>{user.storageGB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back button at the bottom */}
      <div className="back-btn-container">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
