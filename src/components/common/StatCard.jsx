import React from "react";

export const StatCard = ({ title, value, icon, color = "primary", subtitle, trend }) => {
  const colorMap = {
    primary: { bg: "rgba(2, 132, 199, 0.12)", text: "#0284c7" },
    success: { bg: "rgba(16, 185, 129, 0.12)", text: "#10b981" },
    warning: { bg: "rgba(245, 158, 11, 0.12)", text: "#f59e0b" },
    danger: { bg: "rgba(239, 68, 68, 0.12)", text: "#ef4444" },
    indigo: { bg: "rgba(99, 102, 241, 0.12)", text: "#6366f1" },
    purple: { bg: "rgba(168, 85, 247, 0.12)", text: "#a855f7" }
  };

  const scheme = colorMap[color] || colorMap.primary;

  return (
    <div className="stat-card">
      <div>
        <span className="stat-title">{title}</span>
        <div className="stat-value">{value}</div>
        {subtitle && (
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {trend && <span style={{ color: "var(--success-color)", fontWeight: "700" }}>{trend}</span>}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
      {icon && (
        <div
          className="stat-icon"
          style={{ backgroundColor: scheme.bg, color: scheme.text }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
