import React from "react";
import { FiClock, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/dashboard/Topbar/Topbar";
import Sidebar from "../../components/dashboard/sideBar/SideBar";

import "./ComingSoon.css";

function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="dashboard-main">
        {/* TOPBAR */}
        <Topbar />

        <main className="dashboard-content coming-soon-page">
          <div className="coming-soon-container">
            {/* ICON */}

            <div className="coming-soon-icon">
              <FiClock />
            </div>

            {/* BADGE */}

            <span className="coming-soon-badge">Coming Soon</span>

            {/* TITLE */}

            <h1>
              Something Awesome
              <span> Is Coming</span>
            </h1>

            {/* DESCRIPTION */}

            <p className="coming-soon-description">
              We're working hard to bring you something amazing. This feature is
              currently under development and will be available soon.
            </p>

            {/* ACTION */}

            <button
              type="button"
              className="coming-soon-back-btn"
              onClick={() => navigate("/overview")}
            >
              <FiArrowLeft />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ComingSoon;
