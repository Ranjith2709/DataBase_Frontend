import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import GoogleAuth from "./GoogleAuth";
import Home from "./Home";

 
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((person) => {
      setUser(person || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
 
  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
 
  return (
    <Router>
      <Routes>
    <Route path="/auth" element={<GoogleAuth />} />
    <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/auth" />} />
  </Routes>
    </Router>
  );
};
 
export default App;
 
 