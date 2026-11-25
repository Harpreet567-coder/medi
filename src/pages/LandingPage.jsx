import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  IconSun,
  IconMoon,
  IconStethoscope,
  IconShield,
  IconUsers,
  IconCalendar,
  IconFileText,
  IconChevronRight,
  IconPhone,
  IconAward,
  IconHeartPulse,
  IconBuilding,
  IconBed,
  IconDollarSign,
  IconActivity,
  IconClock,
  IconUserCheck,
  IconLock,
  IconMenu,
  IconX
} from "../components/common/Icons";

export const LandingPage = ({ onOpenAuth, onOpenLegal }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const specialties = [
    { name: "Cardiology", doctors: 14, icon: <IconHeartPulse className="w-5 h-5 text-rose-500" />, desc: "Heart conditions, arrhythmia & surgery" },
    { name: "Neurology", doctors: 9, icon: <IconActivity className="w-5 h-5 text-purple-500" />, desc: "Brain, spine & nervous system disorders" },
    { name: "Pediatrics", doctors: 18, icon: <IconUsers className="w-5 h-5 text-sky-500" />, desc: "Infant, child & adolescent medical care" },
    { name: "Orthopedics", doctors: 12, icon: <IconBed className="w-5 h-5 text-amber-500" />, desc: "Bone, joint & musculoskeletal trauma" },
    { name: "Oncology", doctors: 8, icon: <IconShield className="w-5 h-5 text-emerald-500" />, desc: "Comprehensive cancer therapy & care" },
    { name: "General Medicine", doctors: 24, icon: <IconStethoscope className="w-5 h-5 text-indigo-500" />, desc: "Preventive medicine & acute diagnosis" }
  ];

  return (
    <div className="app-shell">
      {/* TOP NAVIGATION HEADER */}
      <header className="site-header">
        <div className="container header-container">
          {/* Brand Logo */}
          <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="brand-icon">
              <IconStethoscope className="w-5 h-5" />
            </div>
            <span>
              Medi<span style={{ color: "var(--brand-primary)" }}>Care</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu">
            <a href="#features">Platform Features</a>
            <a href="#specialties">Specialties</a>
            <a href="#live-status">Live Hospital Status</a>
            <a href="#about">Accreditations</a>
          </nav>

          {/* Action Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-icon"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <IconMoon className="w-5 h-5 text-indigo-500" /> : <IconSun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Login / Register CTA */}
            <button onClick={() => onOpenAuth("login")} className="btn btn-primary btn-md">
              <IconUserCheck className="w-4 h-4" /> Portal Sign In
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: "4rem 0 4.5rem 0", background: "linear-gradient(180deg, var(--brand-primary-light) 0%, transparent 100%)", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
            
            {/* Left Hero Content */}
            <div>
              <div className="badge badge-info" style={{ marginBottom: "1.25rem", padding: "0.4rem 0.85rem", fontSize: "0.825rem" }}>
                <IconHeartPulse className="w-4 h-4" /> Next-Generation Medical Management System
              </div>

              <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)", fontWeight: "800", marginBottom: "1.25rem", lineHeight: "1.15" }}>
                Intelligent Healthcare <br />
                <span style={{ color: "var(--brand-primary)" }}>Connected & Simplified.</span>
              </h1>

              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "560px", lineHeight: "1.65" }}>
                MediCare coordinates clinical care between Patients, Doctors, Nurses, and Hospital Administrators. Experience instant appointment scheduling, synchronized electronic health records, live ward occupancy, and seamless billing.
              </p>

              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <button onClick={() => onOpenAuth("login")} className="btn btn-primary btn-lg">
                  Access Portal <IconChevronRight className="w-5 h-5" />
                </button>

                <button onClick={() => onOpenAuth("signup")} className="btn btn-secondary btn-lg">
                  Book Patient Appointment
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid-4" style={{ gap: "0.85rem" }}>
                <div className="card" style={{ padding: "0.95rem 0.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--brand-primary)" }}>50k+</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>Patients Served</div>
                </div>
                <div className="card" style={{ padding: "0.95rem 0.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--success-color)" }}>150+</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>Top Doctors</div>
                </div>
                <div className="card" style={{ padding: "0.95rem 0.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#6366f1" }}>99.8%</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>Satisfaction</div>
                </div>
                <div className="card" style={{ padding: "0.95rem 0.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--warning-color)" }}>24/7</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.15rem" }}>Emergency</div>
                </div>
              </div>
            </div>

            {/* Right Hero Live Status Card */}
            <div id="live-status" className="card" style={{ padding: "1.75rem", border: "2px solid var(--brand-primary)", boxShadow: "var(--card-shadow-hover)" }}>
              <div className="card-header">
                <div>
                  <h3 style={{ fontWeight: "800", fontSize: "1.15rem" }}>Hospital Operational Hub</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Real-time medical center occupancy</p>
                </div>
                <span className="badge badge-success">
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "currentColor", display: "inline-block" }}></span>
                  Live & Active
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ padding: "0.85rem 1rem", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconBed className="w-5 h-5 text-sky-500" />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>ICU Bed Availability</span>
                  </div>
                  <strong style={{ color: "var(--brand-primary)", fontSize: "0.9rem" }}>18 / 24 Available</strong>
                </div>

                <div style={{ padding: "0.85rem 1rem", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconStethoscope className="w-5 h-5 text-emerald-500" />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>Specialists On-Duty</span>
                  </div>
                  <strong style={{ color: "var(--success-color)", fontSize: "0.9rem" }}>14 Attending</strong>
                </div>

                <div style={{ padding: "0.85rem 1rem", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <IconClock className="w-5 h-5 text-indigo-500" />
                    <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>Avg ER Triage Time</span>
                  </div>
                  <strong style={{ color: "#6366f1", fontSize: "0.9rem" }}>&lt; 6 Minutes</strong>
                </div>
              </div>

              <div style={{ padding: "1rem 1.25rem", background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)", borderRadius: "var(--radius-md)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: "500" }}>24/7 Emergency Dispatch</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "0.02em" }}>+1 (800) MEDICARE</div>
                  </div>
                </div>
                <button
                  onClick={() => onOpenAuth("login")}
                  className="btn btn-secondary btn-sm"
                  style={{ background: "#ffffff", color: "#0284c7", border: "none" }}
                >
                  Quick Sign In
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES / CORE CAPABILITIES */}
      <section id="features" style={{ padding: "4.5rem 0", background: "var(--bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem auto" }}>
            <span className="badge badge-info" style={{ marginBottom: "0.6rem" }}>Core Capabilities</span>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800" }}>Comprehensive Healthcare System</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.5rem" }}>
              Every touchpoint of modern clinical care integrated into one fast, intuitive, and secure platform.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "1.5rem" }}>
            {/* Feature 1 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(2, 132, 199, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconCalendar className="w-6 h-6 text-sky-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Instant Online Booking</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Browse certified doctors by specialty, review consultation fees, pick open slots, and confirm appointments with live calendar synchronization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconFileText className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Digital Prescriptions</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Physicians issue digital prescriptions during consultations. Patients can instantly view medication dosages, treatment instructions, and clinical notes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(99, 102, 241, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconUsers className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Role-Based Dashboards</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Dedicated interfaces for Admin, Doctor, Staff, and Patient. Switch roles seamlessly with one click on the top header navigation bar.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(245, 158, 11, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconBed className="w-6 h-6 text-amber-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Bed & Ward Management</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Track ICU, General Ward, and Pediatric bed occupancy status (Occupied, Available, Cleaning) in real-time with one-click status transitions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(168, 85, 247, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconDollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Medical Invoicing & Billing</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Automated invoice generation for consultation fees, medicines, lab tests, and room charges with instant payment processing updates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(239, 68, 68, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <IconShield className="w-6 h-6 text-rose-500" />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "0.4rem" }}>Real-time State Sync</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                When Admin creates a doctor, they immediately show up in Patient booking. Patient bookings instantly sync to Doctor queues and Staff logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES SECTION */}
      <section id="specialties" style={{ padding: "4.5rem 0", background: "var(--bg-app)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem auto" }}>
            <span className="badge badge-info" style={{ marginBottom: "0.6rem" }}>Clinical Specialties</span>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800" }}>World-Class Medical Departments</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.5rem" }}>
              Our hospital houses leading specialists equipped with advanced diagnostics.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "1.25rem" }}>
            {specialties.map((spec, i) => (
              <div key={i} className="card" style={{ padding: "1.35rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", background: "var(--bg-surface-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {spec.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "700" }}>{spec.name}</h4>
                    <span className="badge badge-info" style={{ fontSize: "0.7rem" }}>{spec.doctors} Specialists</span>
                  </div>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS & SECURITY */}
      <section id="about" style={{ padding: "4rem 0", background: "var(--bg-surface)", borderTop: "1px solid var(--border-main)", borderBottom: "1px solid var(--border-main)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 2.5rem auto" }}>
            <span className="badge badge-info" style={{ marginBottom: "0.5rem" }}>Hospital Standards</span>
            <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>Highest Quality & Patient Safety</h2>
          </div>

          <div className="grid-3" style={{ gap: "1.5rem" }}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="brand-icon" style={{ marginBottom: "1rem", background: "linear-gradient(135deg, #0284c7, #2563eb)" }}>
                <IconAward className="w-5 h-5" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.35rem" }}>JCI Accredited</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Recognized globally for maintaining highest international clinical standards, surgical protocols, and patient safety excellence.
              </p>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="brand-icon" style={{ marginBottom: "1rem", background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <IconShield className="w-5 h-5" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.35rem" }}>HIPAA & PHI Compliant</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                End-to-end encrypted storage for electronic health records, diagnostic lab results, and patient billing information.
              </p>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
              <div className="brand-icon" style={{ marginBottom: "1rem", background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
                <IconBuilding className="w-5 h-5" />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.35rem" }}>Integrated Operations</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Unified coordination connecting admissions, triage, pharmacy, nursing staff, and medical records in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--bg-surface)", padding: "3rem 0 1.5rem 0", marginTop: "auto" }}>
        <div className="container">
          <div className="grid-4" style={{ gap: "2rem", marginBottom: "2rem" }}>
            
            {/* Brand column */}
            <div>
              <div className="brand" style={{ marginBottom: "0.85rem" }}>
                <div className="brand-icon">
                  <IconStethoscope className="w-5 h-5" />
                </div>
                <span>MediCare</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Empowering modern medical centers and healthcare networks with secure, role-based hospital management software.
              </p>
            </div>

            {/* Links column */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "0.85rem", color: "var(--text-main)" }}>Platform Navigation</h4>
              <ul style={{ listStyle: "none", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><a href="#features">Key Features</a></li>
                <li><a href="#specialties">Medical Specialties</a></li>
                <li><a href="#live-status">Live Hospital Status</a></li>
                <li><button onClick={() => onOpenAuth("login")} style={{ color: "var(--brand-primary)", fontWeight: "600" }}>Portal Login</button></li>
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "0.85rem", color: "var(--text-main)" }}>Emergency & Support</h4>
              <ul style={{ listStyle: "none", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Toll Free: +1 (800) MEDICARE</li>
                <li>Dispatch: +1 (555) 019-2831</li>
                <li>Email: support@medicare-health.org</li>
              </ul>
            </div>

            {/* Legal policies column */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "0.85rem", color: "var(--text-main)" }}>Legal Policies</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => onOpenLegal("terms")}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: "space-between", width: "100%", padding: "0.55rem 0.85rem" }}
                >
                  <span style={{ fontSize: "0.825rem" }}>Terms of Service</span>
                  <IconChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                </button>

                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: "space-between", width: "100%", padding: "0.55rem 0.85rem" }}
                >
                  <span style={{ fontSize: "0.825rem" }}>Privacy Policy</span>
                  <IconChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-main)", textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>© {new Date().getFullYear()} MediCare Hospital Management System. All rights reserved.</div>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              <button onClick={() => onOpenLegal("terms")} style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Terms of Service</button>
              <button onClick={() => onOpenLegal("privacy")} style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Privacy Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
