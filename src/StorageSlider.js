import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./StorageSlider.css";

const StorageSlider = ({ uid }) => {
  const [value, setValue] = useState(1);
  const [upiNumber, setUpiNumber] = useState(""); // ✅ Added useState for upiNumber
  const [showQRCode, setShowQRCode] = useState(false); // ✅ Added useState for showQRCode

  const pricePerGB = 1;
  const gbPerStep = 1;

  const totalGB = value * gbPerStep;
  const totalPrice = totalGB * pricePerGB;

  const upiId = "vrraju27@ybl";
  const payeeName = "V Ranjith Raju";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalPrice}&cu=INR`;

  const isUpiNumberValid = upiNumber.length === 10 && /^\d+$/.test(upiNumber);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: uid || "guest",
          gb: totalGB,
          totalPrice,
          upiLink: upiUrl,
          upiNumber,
        }),
      });

      const data = await response.json();
      console.log("Payment intent stored:", data);

      // For desktop, simply show the QR code.
      setShowQRCode(true);

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

      {/* Input for UPI number */}
      <input
        type="text"
        placeholder="Enter UPI Number"
        value={upiNumber}
        onChange={(e) => setUpiNumber(e.target.value)}
        className="upi-input"
      />

      {/* Payment button */}
      <button
        className="pay-btn"
        onClick={handlePay}
        disabled={!isUpiNumberValid} // Disable button if UPI number is not valid
      >
        Pay ₹{totalPrice} via UPI
      </button>

      {/* QR Code */}
      {showQRCode && ( // ✅ Conditionally render QR code
        <div style={{ marginTop: "20px" }}>
          <h4>Scan & Pay:</h4>
          <QRCodeSVG value={upiUrl} size={200} />
        </div>
      )}
    </div>
  );
};

export default StorageSlider;