import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./StorageSlider.css";

const StorageSlider = ({ uid }) => {
  const [value, setValue] = useState(1);
  const [upiNumber, setUpiNumber] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

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
    setShowQRCode(false); // Hide QR code when slider changes
  };

  const handlePay = async () => {
    try {
      // Show the QR code immediately for a better user experience
      setShowQRCode(true);

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
    } catch (error) {
      console.error("Payment error:", error);
      // Handle error case, e.g., show an error message
    }
  };

  return (
    <div className="payment-dialog-container">
      <div className="slider-section">
        <h2 className="section-title">Choose Storage</h2>
        <div className="slider-content">
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={handleChange}
            className="styled-slider"
          />
          <div className="details-row">
            <p>
              Selected: <strong>{value} GB</strong>
            </p>
            <p>
              Price: <strong>₹{totalPrice}</strong>
            </p>
          </div>
        </div>
        <div className="upi-input-container">
          <p className="label">Your UPI Mobile Number</p>
          <input
            type="tel" // Use type="tel" for better mobile keyboard
            placeholder="e.g., 9876543210"
            value={upiNumber}
            onChange={(e) => setUpiNumber(e.target.value)}
            className="upi-input"
            maxLength="10"
          />
        </div>
      </div>
      <div className="payment-section">
        <h2 className="section-title">Complete Payment</h2>
        <div className="qr-code-container">
          {showQRCode ? (
            <>
              <p>Scan with any UPI app</p>
              <div className="qr-code-box">
                <QRCodeSVG value={upiUrl} size={150} />
              </div>
              <div className="upi-info">
                <p>
                  <strong>Total: ₹{totalPrice}</strong>
                </p>
                <p>
                  Pay to: <strong>{payeeName}</strong>
                </p>
              </div>
            </>
          ) : (
            <div className="pay-button-container">
              <p>Generate QR code to pay with your UPI app</p>
              <button
                className="pay-btn"
                onClick={handlePay}
                disabled={!isUpiNumberValid}
              >
                Pay ₹{totalPrice} via UPI
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageSlider;