import React from "react";
import "./StatsCard.css"

function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  subtitle,
}) {
  return (
    <div className="stat-card">
      {/* Top section */}

      <div className="stat-card-top">
        <div className="stat-card-title">{title}</div>

        <div className="stat-card-icon">{icon}</div>
      </div>

      {/* Value */}

      <div className="stat-card-value">{value}</div>

      {/* Bottom */}

      <div className="stat-card-bottom">
        {change && (
          <span className={`stat-change ${changeType}`}>
            {changeType === "positive" && "↑"}
            {changeType === "negative" && "↓"}
            {changeType === "neutral" && "→"}

            {change}
          </span>
        )}

        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}

export default StatCard;
