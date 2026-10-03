import React, { useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiRefreshCw,
  FiMessageCircle,
  FiSend,
  FiClock,
  FiAlertCircle,
  FiChevronDown,
  FiExternalLink,
} from "react-icons/fi";

import "./comments.css";

function Comments() {
  const [comments, setComments] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [campaignFilter, setCampaignFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // FETCH COMMENTS
  // =========================

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");

        return;
      }

      const response = await fetch("https://autodm-latest.onrender.com/api/comments", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();

      setComments(data);
    } catch (error) {
      console.error("Comments fetch error:", error);

      setError("Unable to load comments.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ON PAGE LOAD
  // =========================

  useEffect(() => {
    fetchComments();
  }, []);

  // =========================
  // CAMPAIGN OPTIONS
  // =========================

  const campaignOptions = useMemo(() => {
    const campaigns = comments.map((item) => item.campaign).filter(Boolean);

    return [...new Set(campaigns)];
  }, [comments]);

  // =========================
  // FILTER COMMENTS
  // =========================

  const filteredComments = useMemo(() => {
    return comments.filter((item) => {
      const username = item.username || "";

      const comment = item.comment || "";

      const matchesSearch =
        username.toLowerCase().includes(search.toLowerCase()) ||
        comment.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCampaign =
        campaignFilter === "All" || item.campaign === campaignFilter;

      return matchesSearch && matchesStatus && matchesCampaign;
    });
  }, [comments, search, statusFilter, campaignFilter]);

  // =========================
  // REAL STATISTICS
  // =========================

  const totalComments = comments.length;

  const sentCount = comments.filter((item) => item.status === "Sent").length;

  const pendingCount = comments.filter(
    (item) => item.status === "Pending",
  ).length;

  const failedCount = comments.filter(
    (item) => item.status === "Failed",
  ).length;

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (date) => {
    if (!date) {
      return "-";
    }

    const createdAt = new Date(date);

    const now = new Date();

    const difference = Math.floor((now - createdAt) / 1000);

    if (difference < 60) {
      return `${difference}s ago`;
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d ago`;
    }

    return createdAt.toLocaleDateString();
  };

  return (
    <div className="comments-page">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="comments-header">
        <div>
          <h1>Comments</h1>

          <p>View comments that triggered your Instagram automations.</p>
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={fetchComments}
          disabled={loading}
        >
          <FiRefreshCw className={loading ? "refresh-spinning" : ""} />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="comments-stats">
        {/* TOTAL */}

        <div className="comment-stat-card">
          <div className="comment-stat-icon purple">
            <FiMessageCircle />
          </div>

          <div>
            <span>Total Comments</span>

            <strong>{loading ? "..." : totalComments.toLocaleString()}</strong>
          </div>
        </div>

        {/* SENT */}

        <div className="comment-stat-card">
          <div className="comment-stat-icon green">
            <FiSend />
          </div>

          <div>
            <span>DMs Sent</span>

            <strong>{loading ? "..." : sentCount.toLocaleString()}</strong>
          </div>
        </div>

        {/* PENDING */}

        <div className="comment-stat-card">
          <div className="comment-stat-icon orange">
            <FiClock />
          </div>

          <div>
            <span>Pending</span>

            <strong>{loading ? "..." : pendingCount.toLocaleString()}</strong>
          </div>
        </div>

        {/* FAILED */}

        <div className="comment-stat-card">
          <div className="comment-stat-icon red">
            <FiAlertCircle />
          </div>

          <div>
            <span>Failed</span>

            <strong>{loading ? "..." : failedCount.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          FILTER BAR
      ========================= */}

      <div className="comments-toolbar">
        {/* SEARCH */}

        <div className="comments-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search username or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CAMPAIGN */}

        <div className="comments-filter">
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
          >
            <option value="All">All Campaigns</option>

            {campaignOptions.map((campaign) => (
              <option key={campaign} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>

          <FiChevronDown />
        </div>

        {/* STATUS */}

        <div className="comments-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>

            <option value="Sent">Sent</option>

            <option value="Pending">Pending</option>

            <option value="Failed">Failed</option>
          </select>

          <FiChevronDown />
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="comments-error">
          <p>{error}</p>

          <button type="button" onClick={fetchComments}>
            Try Again
          </button>
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}

      <div className="comments-table-container">
        <div className="comments-table">
          {/* HEADER */}

          <div className="comments-table-header">
            <span>User</span>

            <span>Comment</span>

            <span>Campaign</span>

            <span>Status</span>

            <span>Time</span>

            <span></span>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="comments-empty">
              <FiRefreshCw />

              <h3>Loading comments...</h3>

              <p>Fetching your Instagram comments.</p>
            </div>
          )}

          {/* COMMENTS */}

          {!loading &&
            !error &&
            filteredComments.length > 0 &&
            filteredComments.map((item) => (
              <div className="comment-row" key={item.id}>
                {/* USER */}

                <div className="comment-user">
                  <div className="comment-avatar">
                    {(item.username || "U").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>@{item.username}</strong>

                    <span>Instagram</span>
                  </div>
                </div>

                {/* COMMENT */}

                <div className="comment-content">
                  <span className="comment-text">{item.comment}</span>

                  {item.keyword && (
                    <span className="comment-keyword">{item.keyword}</span>
                  )}
                </div>

                {/* CAMPAIGN */}

                <div className="comment-campaign">
                  {item.campaign || "No campaign"}
                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`comment-status ${(
                      item.status || "Pending"
                    ).toLowerCase()}`}
                  >
                    <span className="status-dot"></span>

                    {item.status || "Pending"}
                  </span>
                </div>

                {/* TIME */}

                <div className="comment-time">{formatTime(item.createdAt)}</div>

                {/* ACTION */}

                <button
                  type="button"
                  className="comment-action"
                  title="View comment"
                >
                  <FiExternalLink />
                </button>
              </div>
            ))}

          {/* EMPTY */}

          {!loading && !error && filteredComments.length === 0 && (
            <div className="comments-empty">
              <FiMessageCircle />

              <h3>No comments found</h3>

              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          PAGINATION
      ========================= */}

      <div className="comments-pagination">
        <span>
          Showing {filteredComments.length} of {totalComments.toLocaleString()}{" "}
          comments
        </span>

        <div className="pagination-buttons">
          <button disabled>Previous</button>

          <button className="pagination-active">1</button>

          <button>2</button>

          <button>3</button>

          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
