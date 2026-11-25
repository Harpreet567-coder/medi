import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHospital } from "../context/HospitalContext";
import {
  IconStethoscope,
  IconCalendar,
  IconFileText,
  IconCheck,
  IconX,
  IconClock,
  IconPlus,
  IconUserCheck
} from "../components/common/Icons";

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, updateAppointment, cancelAppointment, addPrescription, patients } = useHospital();

  const [showRxModal, setShowRxModal] = useState(false);

  // Prescription Form State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [medication, setMedication] = useState("Amoxicillin 500mg");
  const [dosage, setDosage] = useState("1 capsule 3x daily after meals");
  const [duration, setDuration] = useState("7 Days");
  const [notes, setNotes] = useState("Drink plenty of water and rest.");

  const docName = user?.name || "Dr. Alexander Wright";

  const doctorAppointments = appointments.filter((apt) =>
    apt.doctorName?.toLowerCase().includes(docName.toLowerCase()) ||
    docName.toLowerCase().includes(apt.doctorName?.toLowerCase() || "")
  );

  const pendingApts = doctorAppointments.filter((a) => a.status === "Scheduled");
  const completedApts = doctorAppointments.filter((a) => a.status === "Completed");

  const handleCreatePrescriptionSubmit = (e) => {
    e.preventDefault();
    const patientObj = patients.find((p) => p.id === selectedPatientId) || patients[0];

    addPrescription({
      patientId: patientObj?.id || "PAT-1001",
      patientName: patientObj?.name || "Marcus Vance",
      doctorName: docName,
      medications: [
        { name: medication, dosage, duration, instructions: notes }
      ],
      diagnosis: "General Clinical Consultation",
      notes
    });

    setShowRxModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Doctor Profile Banner */}
      <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--success-color)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="brand-icon" style={{ width: "52px", height: "52px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
            <IconStethoscope className="w-7 h-7" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>{docName}</h2>
              <span className="badge badge-success">On Duty</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {user?.specialty || "Senior Specialist & Consultant"} • Active Consultation Suite
            </p>
          </div>
        </div>

        <button onClick={() => setShowRxModal(true)} className="btn btn-primary btn-md">
          <IconPlus className="w-4 h-4" /> Issue Digital Prescription
        </button>
      </div>

      {/* Doctor Stats Grid */}
      <div className="grid-3" style={{ gap: "1.25rem" }}>
        <div className="stat-card">
          <div>
            <span className="stat-title">Assigned Patients</span>
            <div className="stat-value" style={{ color: "var(--brand-primary)" }}>{doctorAppointments.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total roster appointments</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--brand-primary-light)", color: "var(--brand-primary)" }}>
            <IconCalendar className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Scheduled Today</span>
            <div className="stat-value" style={{ color: "var(--warning-color)" }}>{pendingApts.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Awaiting consultation</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--warning-light)", color: "var(--warning-color)" }}>
            <IconClock className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Completed Consultations</span>
            <div className="stat-value" style={{ color: "var(--success-color)" }}>{completedApts.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Finished sessions</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--success-light)", color: "var(--success-color)" }}>
            <IconCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Appointments & Consultations List */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconCalendar className="w-5 h-5 text-emerald-500" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Doctor's Patient Queue</h3>
          </div>
          <span className="badge badge-info">{pendingApts.length} Pending</span>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Schedule</th>
                <th>Patient Details</th>
                <th>Reason for Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                    No active appointments assigned to your roster today.
                  </td>
                </tr>
              ) : (
                doctorAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td style={{ fontSize: "0.825rem" }}>
                      <div style={{ fontWeight: "700", color: "var(--brand-primary)" }}>{apt.time}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{apt.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: "700" }}>{apt.patientName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>ID: {apt.patientId || "PAT-1001"}</div>
                    </td>
                    <td style={{ fontSize: "0.85rem", maxWidth: "260px" }}>{apt.type || apt.reason || "Routine Clinical Checkup"}</td>
                    <td>
                      <span
                        className={`badge ${
                          apt.status === "Completed"
                            ? "badge-success"
                            : apt.status === "Cancelled"
                            ? "badge-danger"
                            : "badge-warning"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status === "Scheduled" && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <button
                            onClick={() => updateAppointment(apt.id, { status: "Completed" })}
                            className="btn btn-success btn-sm"
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem" }}
                          >
                            <IconCheck className="w-3.5 h-3.5" /> Complete
                          </button>

                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem" }}
                            title="Cancel appointment"
                          >
                            <IconX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {apt.status === "Completed" && (
                        <span style={{ fontSize: "0.8rem", color: "var(--success-color)", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <IconCheck className="w-4 h-4" /> Finished
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRESCRIPTION MODAL */}
      {showRxModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowRxModal(false); }}>
          <div className="modal-box">
            <button
              onClick={() => setShowRxModal(false)}
              className="modal-close-btn"
            >
              <IconX className="w-5 h-5" />
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <IconFileText className="w-5 h-5 text-emerald-500" /> Issue Digital Prescription
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Issue electronic prescription synced to patient records
            </p>

            <form onSubmit={handleCreatePrescriptionSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="form-control"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id}) - {p.gender}, {p.age}y
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Medication Name & Strength</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lipitor 20mg / Metformin 500mg"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dosage Instructions</label>
                  <input
                    type="text"
                    required
                    placeholder="1 tablet twice daily"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Course Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="14 Days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Advice & Clinical Notes</label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowRxModal(false)} className="btn btn-secondary btn-md">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-md">
                  Save & Issue Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
