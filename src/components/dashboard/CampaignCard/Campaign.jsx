import React from "react";

import {
  FiInstagram,
  FiMessageCircle,
  FiSend,
  FiMoreVertical,
  FiPause,
  FiPlay,
  FiEdit2,
} from "react-icons/fi";

import "./Campaign.css";

function CampaignCard({ campaign, onEdit = () => {}, onToggle = () => {} }) {
  const isActive = campaign?.active ?? false;

  // =========================
  // REAL CAMPAIGN ANALYTICS
  // =========================

  const analytics = campaign?.analytics;

  const totalComments = analytics?.totalComments ?? 0;
  const totalDms = analytics?.totalDms ?? 0;
  const successRate = analytics?.successRate ?? 0;

  return (
    <div className="campaign-card">
      {/* =========================
          HEADER
      ========================= */}

      <div className="campaign-card-header">
        <div className="campaign-title-wrapper">
          <div className="campaign-icon">
            <FiSend />
          </div>

          <div className="campaign-title">
            <h3>{campaign?.name || "Untitled Campaign"}</h3>

            <div className="campaign-account">
              <FiInstagram />

              <span>@{campaign?.instagramUsername || "unknown"}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="campaign-more"
          aria-label="Campaign options"
        >
          <FiMoreVertical />
        </button>
      </div>

      {/* =========================
          TRIGGER
      ========================= */}

      <div className="campaign-trigger">
        <span className="trigger-label">
          {campaign?.triggerType === "COMMENT"
            ? "Comment Keyword"
            : campaign?.triggerType || "Trigger"}
        </span>

        {campaign?.keyword && (
          <span className="keyword">{campaign.keyword}</span>
        )}
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="campaign-stats">
        {/* =========================
            COMMENTS
        ========================= */}

        <div className="campaign-stat">
          <div className="campaign-stat-icon">
            <FiMessageCircle />
          </div>

          <div className="campaign-stat-content">
            <span className="campaign-stat-label">Comments</span>

            <strong>{totalComments}</strong>
          </div>
        </div>

        {/* =========================
            DMs SENT
        ========================= */}

        <div className="campaign-stat">
          <div className="campaign-stat-icon">
            <FiSend />
          </div>

          <div className="campaign-stat-content">
            <span className="campaign-stat-label">DMs Sent</span>

            <strong>{totalDms}</strong>
          </div>
        </div>

        {/* =========================
            SUCCESS RATE
        ========================= */}

        <div className="campaign-stat">
          <div className="campaign-stat-icon percentage-icon">%</div>

          <div className="campaign-stat-content">
            <span className="campaign-stat-label">Success</span>

            <strong>{Number(successRate).toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="campaign-card-footer">
        {/* STATUS */}

        <div className="campaign-status">
          <span className={`status-dot ${isActive ? "active" : "paused"}`} />

          <span>{isActive ? "Active" : "Paused"}</span>
        </div>

        {/* ACTIONS */}

        <div className="campaign-actions">
          {/* EDIT */}

          <button
            type="button"
            className="campaign-edit"
            onClick={() => onEdit(campaign)}
          >
            <FiEdit2 />

            <span>Edit</span>
          </button>

          {/* PAUSE / ACTIVATE */}

          <button
            type="button"
            className={`campaign-toggle ${isActive ? "pause" : "play"}`}
            onClick={() => onToggle(campaign)}
          >
            {isActive ? (
              <>
                <FiPause />

                <span>Pause</span>
              </>
            ) : (
              <>
                <FiPlay />

                <span>Activate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignCard;
