import React from "react";
import { useHospital } from "../../context/HospitalContext";
import { IconCheck, IconAlertCircle, IconX } from "./Icons";

export const ToastContainer = () => {
  const { toasts, removeToast } = useHospital();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isDanger = toast.type === "danger";

        const variantClass = isSuccess
          ? "toast-success"
          : isWarning
          ? "toast-warning"
          : isDanger
          ? "toast-danger"
          : "toast-info";

        return (
          <div
            key={toast.id}
            className={`toast ${variantClass}`}
          >
            <div style={{ marginTop: "2px" }}>
              {isSuccess ? (
                <IconCheck className="w-5 h-5 text-emerald-500" />
              ) : isDanger ? (
                <IconX className="w-5 h-5 text-rose-500" />
              ) : isWarning ? (
                <IconAlertCircle className="w-5 h-5 text-amber-500" />
              ) : (
                <IconAlertCircle className="w-5 h-5 text-sky-500" />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {toast.title && (
                <div style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "0.15rem" }}>
                  {toast.title}
                </div>
              )}
              <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="btn-icon"
              style={{ width: "24px", height: "24px", minWidth: "24px", border: "none", background: "transparent" }}
              aria-label="Dismiss toast"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};



