import React from "react";

export const LoadingSpinner = ({ message = "Loading hospital data..." }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        color: "var(--text-muted)"
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3.5px solid var(--border-main)",
          borderTopColor: "var(--brand-primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: "1rem", fontSize: "0.875rem", fontWeight: "600", color: "var(--text-secondary)" }}>{message}</p>
    </div>
  );
};
