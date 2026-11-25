import React, { useState } from "react";
import { useAuth, DEMO_USERS } from "../../context/AuthContext";
import { IconX, IconLock, IconMail, IconUserCheck, IconStethoscope, IconShield, IconUsers, IconUserPlus } from "./Icons";

export const AuthModal = ({ isOpen, onClose, defaultTab = "login", onLoginSuccess }) => {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [error, setError] = useState("");

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("admin@medicare.com");
  const [loginPassword, setLoginPassword] = useState("pass123");
  const [selectedRole, setSelectedRole] = useState("admin");

  // Signup Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Patient");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [fee, setFee] = useState("150");

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    const res = login(loginEmail, loginPassword, selectedRole);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res.message || "Failed to log in.");
    }
  };

  const handleOneClickRoleLogin = (roleKey) => {
    const demo = DEMO_USERS[roleKey];
    login(demo.email, "pass123", roleKey);
    if (onLoginSuccess) onLoginSuccess(demo);
    onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!signupName || !signupEmail || !signupPassword) {
      setError("Please fill out all required fields.");
      return;
    }

    const extra = signupRole === "Doctor" ? { specialty, consultationFee: Number(fee), department: specialty } : {};
    const res = signup(signupName, signupEmail, signupPassword, signupRole, extra);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: "480px" }}>
        <button onClick={onClose} className="modal-close-btn" title="Close Modal">
          <IconX className="w-5 h-5" />
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div className="brand-icon" style={{ margin: "0 auto 0.75rem auto", width: "44px", height: "44px" }}>
            <IconStethoscope className="w-6 h-6" />
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: "800" }}>MediCare Portal Access</h2>
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Sign in to your clinical role dashboard or register
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-main)", marginBottom: "1.25rem" }}>
          <button
            onClick={() => { setTab("login"); setError(""); }}
            style={{
              flex: 1,
              padding: "0.65rem",
              fontSize: "0.875rem",
              fontWeight: "700",
              borderBottom: tab === "login" ? "2px solid var(--brand-primary)" : "2px solid transparent",
              color: tab === "login" ? "var(--brand-primary)" : "var(--text-muted)",
              transition: "all 0.2s ease"
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab("signup"); setError(""); }}
            style={{
              flex: 1,
              padding: "0.65rem",
              fontSize: "0.875rem",
              fontWeight: "700",
              borderBottom: tab === "signup" ? "2px solid var(--brand-primary)" : "2px solid transparent",
              color: tab === "signup" ? "var(--brand-primary)" : "var(--text-muted)",
              transition: "all 0.2s ease"
            }}
          >
            Register Account
          </button>
        </div>

        {error && (
          <div style={{ padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)", background: "var(--danger-light)", color: "var(--danger-color)", fontSize: "0.825rem", marginBottom: "1rem", fontWeight: "600" }}>
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit}>
            {/* Direct One-Click Demo Role Cards */}
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Quick One-Click Role Sign In</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
                <button
                  type="button"
                  onClick={() => handleOneClickRoleLogin("admin")}
                  className="card"
                  style={{ padding: "0.65rem", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", borderColor: selectedRole === "admin" ? "var(--brand-primary)" : "var(--border-main)" }}
                >
                  <IconShield className="w-5 h-5 text-sky-500" />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.8rem", color: "var(--text-main)" }}>Admin</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Full Access</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleOneClickRoleLogin("doctor")}
                  className="card"
                  style={{ padding: "0.65rem", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", borderColor: selectedRole === "doctor" ? "var(--brand-primary)" : "var(--border-main)" }}
                >
                  <IconStethoscope className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.8rem", color: "var(--text-main)" }}>Doctor</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Appointments</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleOneClickRoleLogin("staff")}
                  className="card"
                  style={{ padding: "0.65rem", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", borderColor: selectedRole === "staff" ? "var(--brand-primary)" : "var(--border-main)" }}
                >
                  <IconUsers className="w-5 h-5 text-amber-500" />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.8rem", color: "var(--text-main)" }}>Staff</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Beds & Billing</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleOneClickRoleLogin("patient")}
                  className="card"
                  style={{ padding: "0.65rem", textAlign: "left", display: "flex", alignItems: "center", gap: "0.6rem", borderColor: selectedRole === "patient" ? "var(--brand-primary)" : "var(--border-main)" }}
                >
                  <IconUserCheck className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.8rem", color: "var(--text-main)" }}>Patient</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Book Care</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@medicare.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}>
              Sign In to Dashboard
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {tab === "signup" && (
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                placeholder="Marcus Vance / Dr. Clara Oswald"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="user@example.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                placeholder="Create password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                className="form-control"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor / Specialist</option>
                <option value="Staff">Hospital Staff</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>

            {signupRole === "Doctor" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Specialty</label>
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="form-control">
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                    <option>General Medicine</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Fee ($)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}>
              <IconUserPlus className="w-5 h-5" /> Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
