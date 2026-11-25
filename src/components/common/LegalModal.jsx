import React from "react";
import { IconX, IconShield, IconFileText } from "./Icons";

export const LegalModal = ({ isOpen, onClose, type = "terms" }) => {
  if (!isOpen) return null;

  const isTerms = type === "terms";

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: "620px" }}>
        <button
          onClick={onClose}
          className="modal-close-btn"
          title="Close Modal"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3" style={{ marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-main)" }}>
          <div className="brand-icon" style={{ width: "42px", height: "42px" }}>
            {isTerms ? <IconFileText className="w-5 h-5" /> : <IconShield className="w-5 h-5" />}
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "800" }}>{isTerms ? "Terms of Service" : "Privacy Policy"}</h2>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>MediCare Healthcare Platform • Effective August 2026</p>
          </div>
        </div>

        <div className="space-y-4" style={{ maxHeight: "380px", overflowY: "auto", paddingRight: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          {isTerms ? (
            <>
              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>1. Acceptance of Terms</h4>
                <p>
                  By accessing or utilizing the MediCare Hospital Management System, patients, doctors, administrative personnel, and healthcare staff agree to be bound by these terms. This platform operates as an electronic health administration system designed to facilitate care coordination, appointment bookings, and digital records.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>2. Clinical Disclaimer & Telehealth</h4>
                <p>
                  MediCare provides digital scheduling, medical record access, and prescription tracking. Emergency medical conditions require immediate attention by dialing national emergency services (e.g., 911 / 112) or visiting the nearest emergency room.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>3. User Account Responsibilities</h4>
                <p>
                  Users must maintain strict confidentiality of their access credentials. Doctors and hospital staff are bound by HIPAA regulations and professional ethics to protect patient information.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>4. Appointment Cancellations & Fees</h4>
                <p>
                  Appointments booked through MediCare may be rescheduled or cancelled up to 2 hours before the scheduled time slot without penalty. Consultation fees are processed securely.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>1. Health Data Protection & HIPAA Compliance</h4>
                <p>
                  MediCare enforces end-to-end encryption standards to protect Protected Health Information (PHI). All medical records, diagnostic reports, and digital prescriptions stored within local storage and secure server layers adhere strictly to federal healthcare privacy laws.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>2. Information Collection</h4>
                <p>
                  We collect personal identifiers (name, contact details, birth date), clinical history, appointment records, and billing transactions strictly for medical management and care provision.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>3. Data Sharing & Confidentiality</h4>
                <p>
                  Your medical data is shared exclusively with your authorized treating physicians, assigned nurses, and billing staff. MediCare will never sell, rent, or commercialize patient health records to third-party advertisers.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: "700", color: "var(--text-main)", marginBottom: "0.25rem" }}>4. Patient Data Rights</h4>
                <p>
                  Patients retain full rights to request digital copies of their health records, review active prescriptions, and request corrections to demographic details through their Patient Dashboard.
                </p>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border-main)", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} className="btn btn-primary btn-md">
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
