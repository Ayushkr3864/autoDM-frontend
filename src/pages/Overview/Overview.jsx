import React, { useEffect, useState } from "react";

import Topbar from "../../components/dashboard/Topbar/Topbar";
import Sidebar from "../../components/dashboard/sideBar/SideBar";
import ActivityChart from "../../components/dashboard/Activitychart/ActivityChart";
import StatCard from "../../components/dashboard/Stats/StatCard";

import "./Overview.css";

function DashBoard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH CAMPAIGNS + ANALYTICS
  // =========================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      // =========================
      // FETCH CAMPAIGNS
      // =========================

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

      // =========================
      // FETCH ANALYTICS
      // =========================

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
      console.error("Dashboard fetch error:", error);

      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH ON PAGE LOAD
  // =========================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =========================
  // CALCULATE DASHBOARD STATS
  // =========================

  const totalComments = campaigns.reduce(
    (total, campaign) => total + (campaign?.analytics?.totalComments || 0),
    0,
  );

  const totalDms = campaigns.reduce(
    (total, campaign) => total + (campaign?.analytics?.totalDms || 0),
    0,
  );

  const successfulDms = campaigns.reduce(
    (total, campaign) => total + (campaign?.analytics?.successfulDms || 0),
    0,
  );

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.active,
  ).length;

  const replyRate = totalDms > 0 ? (successfulDms / totalDms) * 100 : 0;

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
        {/* =========================
            TOPBAR
        ========================= */}

        <Topbar />

        <main className="dashboard-content">
          {/* =========================
              HEADING
          ========================= */}

          <div className="dashboard-heading">
            <h1>Welcome back! 👋</h1>

            <p>Here's what's happening with your Instagram automation.</p>
          </div>

          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <div className="dashboard-error">
              <p>{error}</p>

              <button type="button" onClick={fetchDashboardData}>
                Try Again
              </button>
            </div>
          )}

          {/* =========================
              STATS
          ========================= */}

          <section className="dashboard-stats">
            <StatCard
              title="Comments"
              value={loading ? "..." : totalComments.toLocaleString()}
              subtitle="All campaigns"
            />

            <StatCard
              title="DMs Sent"
              value={loading ? "..." : totalDms.toLocaleString()}
              subtitle="All campaigns"
            />

            <StatCard
              title="Active Campaigns"
              value={loading ? "..." : activeCampaigns}
              subtitle="Currently running"
            />

            <StatCard
              title="Reply Rate"
              value={loading ? "..." : `${replyRate.toFixed(1)}%`}
              subtitle="Successful DMs"
            />
          </section>

          {/* =========================
              ACTIVITY
          ========================= */}

          <section className="dashboard-activity">
            <ActivityChart />
          </section>

          {/* =========================
              CAMPAIGNS
          ========================= */}

          {/* Campaign cards can be added here later */}
        </main>
      </div>
    </div>
  );
}

export default DashBoard;
