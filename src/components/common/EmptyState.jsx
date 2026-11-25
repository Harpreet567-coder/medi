import React from "react";
import { Button } from "./Button";

export const EmptyState = ({
  icon = "📂",
  title = "No Records Found",
  message = "There are currently no items to display.",
  actionLabel,
  onAction
}) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1.5rem",
        backgroundColor: "var(--bg-surface-subtle)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-strong)",
        margin: "1.25rem 0"
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.35rem" }}>{title}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", maxWidth: "420px", margin: "0 auto 1.25rem" }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
