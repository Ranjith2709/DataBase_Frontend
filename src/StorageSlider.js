import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { API_BASE_URL } from "./config";
import "./StorageSlider.css";

const StorageSlider = ({ uid, user }) => {
  const [value, setValue] = useState(1);
  const [upiNumber, setUpiNumber] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const pricePerGB = 1;
  const gbPerStep = 1;

  const totalGB = value * gbPerStep;
  const totalPrice = totalGB * pricePerGB;

  const upiId = "vrraju27@ybl";
  const payeeName = "V Ranjith Raju";
  const upiQuery = `pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalPrice}&cu=INR`;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalPrice}&cu=INR`;

  const isUpiNumberValid = upiNumber.length === 10 && /^\d+$/.test(upiNumber);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const appCatalog = {
    gpay: {
      key: "gpay",
      label: "Google Pay",
      shortLabel: "G",
      iconClass: "app-icon-gpay",
      hint: "Recommended for iPhone",
      url: isAndroid
        ? `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`
        : `gpay://upi/pay?${upiQuery}`,
    },
    phonepe: {
      key: "phonepe",
      label: "PhonePe",
      shortLabel: "P",
      iconClass: "app-icon-phonepe",
      hint: "Popular UPI app",
      url: isAndroid
        ? `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`
        : `phonepe://pay?${upiQuery}`,
    },
    paytm: {
      key: "paytm",
      label: "Paytm",
      shortLabel: "PT",
      iconClass: "app-icon-paytm",
      hint: "Wallet + UPI",
      url: isAndroid
        ? `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`
        : `paytmmp://pay?${upiQuery}`,
    },
    bhim: {
      key: "bhim",
      label: "BHIM",
      shortLabel: "B",
      iconClass: "app-icon-bhim",
      hint: "NPCI app",
      url: isAndroid
        ? `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`
        : `bhim://upi/pay?${upiQuery}`,
    },
    anyUpi: {
      key: "any-upi",
      label: "Any UPI App",
      shortLabel: "UPI",
      iconClass: "app-icon-any-upi",
      hint: "Use system default",
      url: upiUrl,
    },
  };

  const appOrder = isIos
    ? ["gpay", "phonepe", "paytm", "bhim", "anyUpi"]
    : ["phonepe", "gpay", "paytm", "bhim", "anyUpi"];

  const mobilePaymentApps = appOrder.map((appKey) => appCatalog[appKey]);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
    setShowQRCode(false); // Hide QR code when slider changes
    setShowAppOptions(false);
    setCopyStatus("");
  };

  const openPaymentApp = (url) => {
    window.location.href = url;
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopyStatus("Copied");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const handlePay = async () => {
    if (!user) return alert("Login required!");

    try {
      // Save payment request in backend first
      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          gb: totalGB,
          totalPrice,
          upiLink: upiUrl,
          upiNumber,
          deviceType: isMobile ? "mobile" : "desktop",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Payment initialization failed");
      }

      console.log("Payment processed:", data);

      if (isMobile) {
        setShowAppOptions(true);
      } else {
        setShowQRCode(true); // show QR code for desktop
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
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
            type="tel"
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
              <p>Scan with any UPI app (for Desktop/Laptop)</p>
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
              <p>
                {isMobile
                  ? "Tap below and choose your UPI app"
                  : "Generate QR code to pay with your UPI app"}
              </p>
              <button
                className="pay-btn"
                onClick={handlePay}
                disabled={!isUpiNumberValid}
              >
                Pay ₹{totalPrice} via UPI
              </button>

              {showAppOptions && isMobile && (
                <div className="ios-upi-options">
                  <p>
                    Select the app you want to pay with.
                  </p>
                  <div className="ios-upi-actions">
                    {mobilePaymentApps.map((app) => (
                      <button
                        key={app.key}
                        className="secondary-btn"
                        onClick={() => openPaymentApp(app.url)}
                      >
                        <span className="app-row-content">
                          <span className={`app-icon ${app.iconClass}`}>
                            {app.shortLabel}
                          </span>
                          <span className="app-text-block">
                            <span className="app-main-label">Pay with {app.label}</span>
                            <span className="app-sub-label">{app.hint}</span>
                          </span>
                        </span>
                      </button>
                    ))}
                    <button
                      className="secondary-btn"
                      onClick={() => copyToClipboard(upiId)}
                    >
                      Copy UPI ID
                    </button>
                  </div>
                  <p className="copy-status">
                    If an app does not open, install it or use Any UPI App.
                  </p>
                  {copyStatus && <p className="copy-status">{copyStatus}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageSlider;
