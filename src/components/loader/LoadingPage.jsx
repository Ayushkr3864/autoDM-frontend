import React from "react";
import "./Loader.css";

function LoadingPage() {
  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="loading-logo">
          <span className="logo-icon">A</span>
          <span className="logo-text">AutoDM</span>
        </div>

        <div className="loader"></div>

        <h2>Getting things ready...</h2>

        <p>Please wait while we prepare your AutoDM dashboard.</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
