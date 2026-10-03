import React, { useEffect, useState } from "react";


import Topbar from "../../components/dashboard/Topbar/Topbar";
import Sidebar from "../../components/dashboard/sideBar/SideBar";
import CampaignCard from "../../components/dashboard/CampaignCard/Campaign";

import "./Campaing.css";
// import LoadingPage from './../../components/loader/LoadingPage';
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Campaing() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()
  // =========================
  // FETCH CAMPAIGNS
  // =========================

 const fetchCampaigns = async () => {
   try {
     setLoading(true);
     setError("");

     const token =
       localStorage.getItem("token") || sessionStorage.getItem("token");

     if (!token) {
       setError("You are not logged in.");
       return;
     }

     const response = await fetch(
       "https://autodm-latest.onrender.com/api/campaigns",
       {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       },
     );

     if (!response.ok) {
       throw new Error("Failed to fetch campaigns");
     }

     const data = await response.json();

     // ==========================================
     // FETCH ANALYTICS FOR EACH CAMPAIGN
     // ==========================================

     const campaignsWithAnalytics = await Promise.all(
       data.map(async (campaign) => {
         try {
           const analyticsResponse = await fetch(
             `https://autodm-latest.onrender.com/api/campaigns/${campaign.id}/analytics`,
             {
               method: "GET",
               headers: {
                 Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json",
               },
             },
           );

           if (!analyticsResponse.ok) {
             throw new Error(
               `Failed to fetch analytics for campaign ${campaign.id}`,
             );
           }

           const analytics = await analyticsResponse.json();

           return {
             ...campaign,
             analytics,
           };
         } catch (analyticsError) {
           console.error(
             `Analytics error for campaign ${campaign.id}:`,
             analyticsError,
           );

           // Keep campaign visible even if analytics fail
           return {
             ...campaign,
             analytics: {
               campaignId: campaign.id,
               totalComments: 0,
               totalDms: 0,
               successfulDms: 0,
               failedDms: 0,
               successRate: 0,
             },
           };
         }
       }),
     );

     setCampaigns(campaignsWithAnalytics);
   } catch (error) {
     console.error("Campaign fetch error:", error);

     setError("Unable to load campaigns.");
   } finally {
     setLoading(false);
   }
 };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // =========================
  // EDIT CAMPAIGN
  // =========================

  const handleEdit = (campaign) => {
    console.log("Edit campaign:", campaign);
  };

  // =========================
  // TOGGLE CAMPAIGN
  // =========================

  const handleToggle = async (campaign) => {
    console.log(
      campaign.active ? "Pausing campaign:" : "Activating campaign:",
      campaign,
    );

    // Backend endpoint will be added later:
    // PATCH /api/campaigns/{id}/status
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Topbar */}
        <Topbar />

        <main className="dashboard-content">
          {/* Heading */}
          <div className="dashboard-heading">
            <h1>Welcome back! 👋</h1>

            <p>Here's what's happening with your Instagram automation.</p>
          </div>

          {/* =========================
              CAMPAIGNS
          ========================= */}

          <section className="dashboard-campaigns">
            {/* Section Header */}
            <div className="campaign-section-header">
              <div className="campaign-section-title">
                <h2>Active Campaigns</h2>

                <p>Monitor your running automations.</p>
              </div>

              <div className="campaign-header-actions">
                {/* Refresh */}
                <button
                  type="button"
                  className="campaign-refresh-btn"
                  onClick={fetchCampaigns}
                  disabled={loading}
                >
                  <FiRefreshCw className={loading ? "refresh-spinning" : ""} />

                  <span>{loading ? "Refreshing..." : "Refresh"}</span>
                </button>

                {/* Add Campaign */}
                <button
                  type="button"
                  className="add-campaign-btn"
                  onClick={() => navigate("/campaigns/create")}
                >
                  <FiPlus />

                  <span>Add Campaign</span>
                </button>
              </div>
            </div>

            {/* Loading */}

            {loading && (
              <div className="campaign-loading">
                <p>Loading campaigns...</p>
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="campaign-error">
                <p>{error}</p>

                <button type="button" onClick={fetchCampaigns}>
                  Try Again
                </button>
              </div>
            )}

            {/* Empty */}

            {!loading && !error && campaigns.length === 0 && (
              <div className="campaign-empty">
                <h3>No campaigns yet</h3>

                <p>
                  Create your first Instagram automation campaign to get
                  started.
                </p>
              </div>
            )}

            {/* Campaign Cards */}

            {!loading && !error && campaigns.length > 0 && (
              <div className="campaign-grid">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onEdit={handleEdit}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Campaing;
