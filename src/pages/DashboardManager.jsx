import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { AdminDashboard } from "./AdminDashboard";
import { DoctorDashboard } from "./DoctorDashboard";
import { StaffDashboard } from "./StaffDashboard";
import { PatientDashboard } from "./PatientDashboard";
import {
  IconStethoscope,
  IconSun,
  IconMoon,
  IconLogOut,
  IconShield,
  IconUsers,
  IconUserCheck
} from "../components/common/Icons";

export const DashboardManager = ({ onReturnLanding }) => {
  const { user, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const role = user?.role || "Admin";

  return (
    <div className="app-shell">
      {/* HEADER NAVBAR WITH INTEGRATED DASHBOARD SWITCHER */}
      <header className="site-header">
        <div className="container header-container">
          {/* Logo & Landing Link */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="brand" onClick={onReturnLanding} title="Back to Homepage">
              <div className="brand-icon">
                <IconStethoscope className="w-5 h-5" />
              </div>
              <span>
                Medi<span style={{ color: "var(--brand-primary)" }}>Care</span>
              </span>
            </div>

            <button
              onClick={onReturnLanding}
              className="btn btn-secondary btn-sm"
              title="Return to public landing page"
            >
              ← Public Site
            </button>
          </div>

          {/* DASHBOARD ROLE SWITCHER (Switch views instantly on header!) */}
          <div className="role-switcher-bar" title="Instantly switch role view">
            <button
              onClick={() => switchRole("admin")}
              className={`role-switcher-btn ${role === "Admin" ? "active" : ""}`}
            >
              <IconShield className="w-4 h-4" /> Admin
            </button>

            <button
              onClick={() => switchRole("doctor")}
              className={`role-switcher-btn ${role === "Doctor" ? "active" : ""}`}
            >
              <IconStethoscope className="w-4 h-4" /> Doctor
            </button>

            <button
              onClick={() => switchRole("staff")}
              className={`role-switcher-btn ${role === "Staff" ? "active" : ""}`}
            >
              <IconUsers className="w-4 h-4" /> Staff
            </button>

            <button
              onClick={() => switchRole("patient")}
              className={`role-switcher-btn ${role === "Patient" ? "active" : ""}`}
            >
              <IconUserCheck className="w-4 h-4" /> Patient
            </button>
          </div>

          {/* RIGHT USER CONTROLS */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="btn-icon" title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}>
              {theme === "light" ? <IconMoon className="w-5 h-5 text-indigo-500" /> : <IconSun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Profile Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingLeft: "0.6rem", borderLeft: "1px solid var(--border-main)" }}>
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"}
                alt={user?.name || "User"}
                style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--brand-primary)" }}
              />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.825rem", fontWeight: "700", lineHeight: 1.1 }}>{user?.name}</div>
                <div style={{ fontSize: "0.725rem", color: "var(--brand-primary)", fontWeight: "600" }}>{user?.role} Portal</div>
              </div>
            </div>

            {/* Sign Out */}
            <button onClick={logout} className="btn-icon" style={{ color: "var(--danger-color)" }} title="Sign Out">
              <IconLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT FOR ACTIVE ROLE */}
      <main className="container" style={{ flex: 1, padding: "2rem 1.5rem" }}>
        {role === "Admin" && <AdminDashboard />}
        {role === "Doctor" && <DoctorDashboard />}
        {role === "Staff" && <StaffDashboard />}
        {role === "Patient" && <PatientDashboard />}
      </main>

      <footer style={{ padding: "1rem", textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", background: "var(--bg-surface)", borderTop: "1px solid var(--border-main)" }}>
        MediCare Hospital Management System • Active Role View: <strong style={{ color: "var(--brand-primary)" }}>{role}</strong>
      </footer>
    </div>
  );
};
