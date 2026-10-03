import React, { useEffect, useState } from "react";
import "./ActivityChart.css";

function ActivityChart() {
  const [range, setRange] = useState("7");

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // FETCH ACTIVITY
  // =========================

  const fetchActivity = async () => {
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
        `https://autodm-latest.onrender.com/api/dashboard/activity?range=${range}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch activity data");
      }

      const data = await response.json();

      setChartData(data);
    } catch (error) {
      console.error("Activity fetch error:", error);

      setError("Unable to load activity data.");

      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH WHEN RANGE CHANGES
  // =========================

  useEffect(() => {
    fetchActivity();
  }, [range]);

  // =========================
  // MAX VALUE
  // =========================

  const maxValue =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => Math.max(item.comments, item.dms)))
      : 1;

  // =========================
  // TOTALS
  // =========================

  const totalComments = chartData.reduce(
    (total, item) => total + item.comments,
    0,
  );

  const totalDms = chartData.reduce((total, item) => total + item.dms, 0);

  const automationRate =
    totalComments > 0 ? (totalDms / totalComments) * 100 : 0;

  // =========================
  // POINT CALCULATION
  // =========================

  const getX = (index) => {
    if (chartData.length <= 1) {
      return 350;
    }

    return (index / (chartData.length - 1)) * 680 + 10;
  };

  const getY = (value) => {
    return 260 - (value / maxValue) * 240;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="activity-chart-card">
        <div className="activity-chart-header">
          <div>
            <h2>Automation Activity</h2>

            <p>Track your comments and automated DMs</p>
          </div>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="activity-range"
          >
            <option value="7">Last 7 days</option>

            <option value="30">Last 30 days</option>

            <option value="90">Last 90 days</option>
          </select>
        </div>

        <div className="activity-loading">Loading activity...</div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="activity-chart-card">
        <div className="activity-chart-header">
          <div>
            <h2>Automation Activity</h2>

            <p>Track your comments and automated DMs</p>
          </div>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="activity-range"
          >
            <option value="7">Last 7 days</option>

            <option value="30">Last 30 days</option>

            <option value="90">Last 90 days</option>
          </select>
        </div>

        <div className="activity-error">
          <p>{error}</p>

          <button type="button" onClick={fetchActivity}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="activity-chart-card">
      {/* =========================
          HEADER
      ========================= */}

      <div className="activity-chart-header">
        <div>
          <h2>Automation Activity</h2>

          <p>Track your comments and automated DMs</p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="activity-range"
        >
          <option value="7">Last 7 days</option>

          <option value="30">Last 30 days</option>

          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* =========================
          LEGEND
      ========================= */}

      <div className="activity-legend">
        <div className="legend-item">
          <span className="legend-dot comments-dot"></span>
          Comments
        </div>

        <div className="legend-item">
          <span className="legend-dot dms-dot"></span>
          DMs Sent
        </div>
      </div>

      {/* =========================
          CHART
      ========================= */}

      <div className="chart-container">
        <div className="y-axis">
          <span>{maxValue}</span>

          <span>{Math.round(maxValue * 0.75)}</span>

          <span>{Math.round(maxValue * 0.5)}</span>

          <span>{Math.round(maxValue * 0.25)}</span>

          <span>0</span>
        </div>

        <div className="chart-area">
          {/* GRID */}

          <div className="chart-grid">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* SVG */}

          {chartData.length > 0 ? (
            <svg
              className="chart-svg"
              viewBox="0 0 700 280"
              preserveAspectRatio="none"
            >
              {/* COMMENTS LINE */}

              <polyline
                points={chartData
                  .map((item, index) => {
                    const x = getX(index);

                    const y = getY(item.comments);

                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="var(--chart-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* DMS LINE */}

              <polyline
                points={chartData
                  .map((item, index) => {
                    const x = getX(index);

                    const y = getY(item.dms);

                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="var(--chart-secondary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* COMMENTS POINTS */}

              {chartData.map((item, index) => {
                const x = getX(index);

                const y = getY(item.comments);

                return (
                  <circle
                    key={`comment-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--chart-primary)"
                    className="chart-point"
                  />
                );
              })}

              {/* DM POINTS */}

              {chartData.map((item, index) => {
                const x = getX(index);

                const y = getY(item.dms);

                return (
                  <circle
                    key={`dm-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--chart-secondary)"
                    className="chart-point"
                  />
                );
              })}
            </svg>
          ) : (
            <div className="activity-no-data">No activity data available.</div>
          )}

          {/* =========================
              X AXIS
          ========================= */}

          <div className="x-axis">
            {chartData.map((item, index) => (
              <span key={`${item.label}-${index}`}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="activity-summary">
        <div className="summary-item">
          <span>Total Comments</span>

          <strong>{totalComments.toLocaleString()}</strong>
        </div>

        <div className="summary-item">
          <span>Total DMs Sent</span>

          <strong>{totalDms.toLocaleString()}</strong>
        </div>

        <div className="summary-item">
          <span>Automation Rate</span>

          <strong>{automationRate.toFixed(1)}%</strong>
        </div>
      </div>
    </section>
  );
}

export default ActivityChart;
