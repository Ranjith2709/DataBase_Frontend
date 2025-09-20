import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import "./GoogleAuth.css";
import bgImage from "./assets/coverl.jpg";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((person) => {
      setUser(person || null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Send user data to backend dynamically
  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        })
      })
        .then(res => res.json())
        .then(data => console.log("User saved in DB:", data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      await auth.signInWithPopup(googleProvider);
      navigate("/"); // ✅ Navigate to home only after login
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null); // Reset user state
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div
  className="auth-container"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "100% auto",   // width = 100%, height = auto (don’t stretch)
    backgroundPosition: "left top", // start from left
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw"
  }}
>


      <div className="auth-card">
        {user ? (
          <>
            <div className="auth-avatar">{user.displayName?.slice(0, 2).toUpperCase()}</div>
            <h2 className="auth-title">Welcome, {user.displayName}</h2>
            <p className="auth-subtitle">{user.email}</p>
            <button className="sign-out-btn" onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <h2 className="auth-title">Sign in</h2>
            <p className="auth-subtitle">with your Google Account to continue to Gmail.</p>
            <button className="google-btn" onClick={signInWithGoogle}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="google-icon"
              />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleAuth;
