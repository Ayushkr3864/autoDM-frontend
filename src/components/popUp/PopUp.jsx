import React, { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import "./PopUp.css";

function PopUp({
  type = "success",
  message,
  isVisible,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`popup-message ${type}`}>
      <div className="popup-icon">
        {type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
      </div>

      <div className="popup-content">
        <strong>{type === "success" ? "Success" : "Error"}</strong>

        <p>{message}</p>
      </div>

      <button
        className="popup-close"
        onClick={onClose}
        aria-label="Close message"
      >
        <FiX />
      </button>
    </div>
  );
}

export default PopUp;
