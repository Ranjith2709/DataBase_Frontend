import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // ✅ use named export
import "./StorageSlider.css";

const StorageSlider = ({ uid }) => {
  const [value, setValue] = useState(1);
  const pricePerGB = 1; // ₹30 per GB
  const gbPerStep = 1; // each step = 3 GB

  const totalGB = value * gbPerStep;
  const totalPrice = totalGB * pricePerGB;

  const upiId = "vrraju27@ybl";
  const payeeName = "V Ranjith Raju";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalPrice}&cu=INR`;

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  // 🔹 Create payment + open UPI
  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: uid || "guest", // pass real uid after Google login
          gb: totalGB,
          totalPrice,
          upiLink: upiUrl,
        }),
      });

      const data = await response.json();
      console.log("Payment intent stored:", data);

      // redirect to UPI
      window.location.href = upiUrl;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="slider-container">
      <h3>Choose Storage</h3>

      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
        className="slider"
      />

      <p>
        Selected: <strong>{value}</strong> × 3 = <strong>{totalGB} GB</strong>
      </p>
      <p>
        Price: <strong>₹{totalPrice}</strong>
      </p>

      {/* Payment button */}
      <button className="pay-btn" onClick={handlePay}>
        Pay ₹{totalPrice} via UPI
      </button>

      {/* QR Code */}
      {upiUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Scan & Pay:</h4>
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
      )}
    </div>
  );
};

export default StorageSlider;
