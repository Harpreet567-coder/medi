import React, { useEffect } from "react";

export const Toast = ({ toasts = [], onRemove }) => {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const getIcon = (type) => {
    switch (type) {
      case "success": return "✅";
      case "danger": return "❌";
      case "warning": return "⚠️";
      default: return "ℹ️";
    }
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <span style={{ fontSize: "1.2rem" }}>{getIcon(toast.type)}</span>
      <div style={{ flex: 1 }}>
        {toast.title && <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--text-primary)" }}>{toast.title}</strong>}
        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{toast.message}</span>
      </div>
      <button onClick={() => onRemove(toast.id)} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>✕</button>
    </div>
  );
};
