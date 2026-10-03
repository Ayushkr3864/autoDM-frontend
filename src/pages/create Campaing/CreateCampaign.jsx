import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiSend, FiExternalLink, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./CreateCampaign.css";
import Navbar from "./../../components/Navbar/Navbar";

function CreateCampaign() {
  const navigate = useNavigate();

  // =========================================================
  // INSTAGRAM ACCOUNTS
  // =========================================================

  const [instagramAccounts, setInstagramAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);

  // =========================================================
  // INSTAGRAM REEL
  // =========================================================

  const [reelUrl, setReelUrl] = useState("");
  const [selectedMediaId, setSelectedMediaId] = useState("");
  const [reelInfo, setReelInfo] = useState(null);
  const [reelLoading, setReelLoading] = useState(false);

  // =========================================================
  // FORM
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    instagramAccountId: "",
    triggerType: "COMMENT",
    keyword: "",
    message: "",
    active: true,
  });

  // =========================================================
  // UI STATE
  // =========================================================

  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // TOKEN
  // =========================================================

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // =========================================================
  // FETCH INSTAGRAM ACCOUNTS
  // =========================================================

  const fetchInstagramAccounts = async () => {
    try {
      setAccountsLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "https://autodm-latest.onrender.com/api/instagram/accounts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Instagram accounts");
      }

      const data = await response.json();

      setInstagramAccounts(data);

      // Automatically select account if only one exists
      if (data.length === 1) {
        const accountId = String(data[0].id);

        setFormData((prev) => ({
          ...prev,
          instagramAccountId: accountId,
        }));
      }
    } catch (error) {
      console.error("Instagram account error:", error);

      setError("Unable to load Instagram accounts.");
    } finally {
      setAccountsLoading(false);
    }
  };

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {
    fetchInstagramAccounts();
  }, []);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If Instagram account changes,
    // clear previously validated Reel.
    if (name === "instagramAccountId") {
      setReelUrl("");
      setSelectedMediaId("");
      setReelInfo(null);
    }

    if (error) {
      setError("");
    }
  };

  // =========================================================
  // REEL URL CHANGE
  // =========================================================

  const handleReelUrlChange = (event) => {
    const value = event.target.value;

    setReelUrl(value);

    // URL changed, so previously validated Reel
    // should no longer be considered valid.
    setSelectedMediaId("");
    setReelInfo(null);

    if (error) {
      setError("");
    }
  };

  // =========================================================
  // VALIDATE REEL
  // =========================================================

  const handleValidateReel = async () => {
    setError("");
    setReelInfo(null);
    setSelectedMediaId("");

    // -----------------------------------------------------
    // ACCOUNT VALIDATION
    // -----------------------------------------------------

    if (!formData.instagramAccountId) {
      setError("Please select an Instagram account first.");
      return;
    }

    // -----------------------------------------------------
    // URL VALIDATION
    // -----------------------------------------------------

    const trimmedUrl = reelUrl.trim();

    if (!trimmedUrl) {
      setError("Please paste an Instagram Reel link.");
      return;
    }

    const isInstagramReel =
      /^https?:\/\/(www\.)?instagram\.com\/reel\/[^/?]+\/?(\?.*)?$/i.test(
        trimmedUrl,
      );

    if (!isInstagramReel) {
      setError("Please enter a valid Instagram Reel URL.");
      return;
    }

    try {
      setReelLoading(true);

      const token = getToken();

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "https://autodm-latest.onrender.com/api/instagram/resolve-reel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instagramAccountId: Number(formData.instagramAccountId),
            reelUrl: trimmedUrl,
          }),
        },
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to validate Reel.",
        );
      }

      // -------------------------------------------------
      // VALIDATION SUCCESS
      // -------------------------------------------------

      if (!data.mediaId) {
        throw new Error("Instagram media ID was not returned.");
      }

      setSelectedMediaId(data.mediaId);

      setReelInfo({
        mediaId: data.mediaId,
        caption: data.caption || "",
        thumbnailUrl: data.thumbnailUrl || data.thumbnail_url || "",
        permalink: data.permalink || trimmedUrl,
        timestamp: data.timestamp || null,
      });
    } catch (error) {
      console.error("Reel validation error:", error);

      setSelectedMediaId("");
      setReelInfo(null);

      setError(error.message || "Unable to validate Instagram Reel.");
    } finally {
      setReelLoading(false);
    }
  };

  // =========================================================
  // CREATE CAMPAIGN
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!formData.name.trim()) {
      setError("Campaign name is required.");
      return;
    }

    if (!formData.instagramAccountId) {
      setError("Please select an Instagram account.");
      return;
    }

    if (!reelUrl.trim()) {
      setError("Please paste an Instagram Reel link.");
      return;
    }

    if (!selectedMediaId) {
      setError("Please validate your Instagram Reel first.");
      return;
    }

    if (formData.triggerType === "COMMENT" && !formData.keyword.trim()) {
      setError("Keyword is required.");
      return;
    }

    if (!formData.message.trim()) {
      setError("DM message is required.");
      return;
    }

    try {
      setCreating(true);

      const token = getToken();

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      // =================================================
      // CAMPAIGN DATA
      // =================================================

      const campaignData = {
        name: formData.name.trim(),

        instagramAccountId: Number(formData.instagramAccountId),

        // This is the actual Instagram media ID
        // returned by the backend after validating
        // the Reel URL.
        mediaId: selectedMediaId,

        triggerType: formData.triggerType,

        keyword: formData.keyword.trim(),

        message: formData.message.trim(),

        active: formData.active,
      };

      console.log("Creating campaign:", campaignData);

      // =================================================
      // API
      // =================================================

      const response = await fetch(
        "https://autodm-latest.onrender.com/api/campaigns",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(campaignData),
        },
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to create campaign",
        );
      }

      console.log("Campaign created:", data);

      // =================================================
      // REDIRECT
      // =================================================

      navigate("/campaigns");
    } catch (error) {
      console.error("Create campaign error:", error);

      setError(error.message || "Unable to create campaign.");
    } finally {
      setCreating(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <Navbar />

      <div className="create-campaign-page">
        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="create-campaign-top">
          <button
            type="button"
            className="back-campaign-btn"
            onClick={() => navigate("/campaigns")}
          >
            <FiArrowLeft />

            <span>Back to Campaigns</span>
          </button>
        </div>

        {/* =================================================
                    CONTENT
                ================================================= */}

        <div className="create-campaign-container">
          {/* =================================================
                        TITLE
                    ================================================= */}

          <div className="create-campaign-heading">
            <div className="create-campaign-icon">
              <FiSend />
            </div>

            <div>
              <h1>Create Campaign</h1>

              <p>Set up an Instagram comment-to-DM automation.</p>
            </div>
          </div>

          {/* =================================================
                        FORM CARD
                    ================================================= */}

          <div className="create-campaign-card">
            <form onSubmit={handleSubmit} className="create-campaign-form">
              {/* =================================================
                                CAMPAIGN NAME
                            ================================================= */}

              <div className="form-group">
                <label htmlFor="campaign-name">Campaign Name</label>

                <input
                  id="campaign-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Free Instagram Guide"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* =================================================
                                INSTAGRAM ACCOUNT
                            ================================================= */}

              <div className="form-group">
                <label htmlFor="instagram-account">Instagram Account</label>

                {accountsLoading ? (
                  <div className="account-loading">
                    Loading Instagram accounts...
                  </div>
                ) : (
                  <select
                    id="instagram-account"
                    name="instagramAccountId"
                    value={formData.instagramAccountId}
                    onChange={handleChange}
                  >
                    <option value="">Select Instagram account</option>

                    {instagramAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        @{account.username}
                      </option>
                    ))}
                  </select>
                )}

                {!accountsLoading && instagramAccounts.length === 0 && (
                  <span className="form-help">
                    No Instagram account connected. Please connect an account
                    first.
                  </span>
                )}
              </div>

              {/* =================================================
                                INSTAGRAM REEL URL
                            ================================================= */}

              <div className="form-group">
                <label htmlFor="instagram-reel-url">Instagram Reel</label>

                <div className="reel-url-input-wrapper">
                  <input
                    id="instagram-reel-url"
                    type="url"
                    placeholder="https://www.instagram.com/reel/..."
                    value={reelUrl}
                    onChange={handleReelUrlChange}
                  />

                  <button
                    type="button"
                    className="validate-reel-btn"
                    onClick={handleValidateReel}
                    disabled={
                      reelLoading ||
                      !formData.instagramAccountId ||
                      !reelUrl.trim()
                    }
                  >
                    {reelLoading ? "Checking..." : "Validate Reel"}
                  </button>
                </div>

                <span className="form-help">
                  Paste the link of the Instagram Reel you want this campaign to
                  monitor.
                </span>
              </div>

              {/* =================================================
                                VALIDATED REEL
                            ================================================= */}

              {reelInfo && selectedMediaId && (
                <div className="selected-reel-info">
                  <div className="selected-reel-preview">
                    {reelInfo.thumbnailUrl && (
                      <img
                        src={reelInfo.thumbnailUrl}
                        alt={reelInfo.caption || "Instagram Reel"}
                        className="selected-reel-thumbnail"
                      />
                    )}

                    <div className="selected-reel-details">
                      <div className="reel-verified">
                        <FiCheck />

                        <strong>Reel verified</strong>
                      </div>

                      <span>
                        {reelInfo.caption
                          ? reelInfo.caption.length > 100
                            ? reelInfo.caption.substring(0, 100) + "..."
                            : reelInfo.caption
                          : "Instagram Reel"}
                      </span>

                      {reelInfo.permalink && (
                        <a
                          href={reelInfo.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiExternalLink />
                          View Reel
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                                TRIGGER TYPE
                            ================================================= */}

              <div className="form-group">
                <label htmlFor="trigger-type">Trigger Type</label>

                <select
                  id="trigger-type"
                  name="triggerType"
                  value={formData.triggerType}
                  onChange={handleChange}
                >
                  <option value="COMMENT">Comment Keyword</option>
                </select>
              </div>

              {/* =================================================
                                KEYWORD
                            ================================================= */}

              {formData.triggerType === "COMMENT" && (
                <div className="form-group">
                  <label htmlFor="keyword">Comment Keyword</label>

                  <input
                    id="keyword"
                    type="text"
                    name="keyword"
                    placeholder="e.g. GUIDE"
                    value={formData.keyword}
                    onChange={handleChange}
                  />

                  <span className="form-help">
                    When someone comments this keyword on the selected Reel,
                    your automation will trigger.
                  </span>
                </div>
              )}

              {/* =================================================
                                MESSAGE
                            ================================================= */}

              <div className="form-group">
                <label htmlFor="message">DM Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Hey! Thanks for commenting. Here's your guide..."
                  value={formData.message}
                  onChange={handleChange}
                />

                <span className="form-help">
                  This message will be sent automatically when the campaign is
                  triggered.
                </span>
              </div>

              {/* =================================================
                                STATUS
                            ================================================= */}

              <div className="campaign-status-setting">
                <div>
                  <span className="status-title">Campaign Status</span>

                  <span className="status-description">
                    Activate campaign immediately after creation.
                  </span>
                </div>

                <label className="campaign-switch">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />

                  <span className="campaign-slider" />
                </label>
              </div>

              {/* =================================================
                                ERROR
                            ================================================= */}

              {error && <div className="create-campaign-error">{error}</div>}

              {/* =================================================
                                ACTIONS
                            ================================================= */}

              <div className="create-campaign-actions">
                <button
                  type="button"
                  className="cancel-create-btn"
                  onClick={() => navigate("/campaigns")}
                  disabled={creating}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-create-btn"
                  disabled={
                    creating ||
                    accountsLoading ||
                    reelLoading ||
                    instagramAccounts.length === 0 ||
                    !selectedMediaId
                  }
                >
                  {creating ? "Creating..." : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;
