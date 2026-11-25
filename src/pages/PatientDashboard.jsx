import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHospital } from "../context/HospitalContext";
import {
  IconCalendar,
  IconStethoscope,
  IconFileText,
  IconDollarSign,
  IconPlus,
  IconSearch,
  IconCheck,
  IconX,
  IconClock,
  IconShield,
  IconHeartPulse
} from "../components/common/Icons";

export const PatientDashboard = () => {
  const { user } = useAuth();
  const { doctors, appointments, prescriptions, billing, addAppointment, cancelAppointment, updateBillingStatus } = useHospital();

  const [activeTab, setActiveTab] = useState("book");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchDoc, setSearchDoc] = useState("");

  // Booking Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [reason, setReason] = useState("General Health Consultation");

  const patientName = user?.name || "Marcus Vance";

  // Filtered Doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec = selectedSpecialty === "All" || doc.department === selectedSpecialty || doc.specialization?.includes(selectedSpecialty);
    const matchesSearch = doc.name.toLowerCase().includes(searchDoc.toLowerCase()) || doc.specialization?.toLowerCase().includes(searchDoc.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  const myAppointments = appointments.filter((apt) =>
    apt.patientName?.toLowerCase().includes(patientName.toLowerCase()) ||
    patientName.toLowerCase().includes(apt.patientName?.toLowerCase() || "")
  );

  const myPrescriptions = prescriptions.filter((rx) =>
    rx.patientName?.toLowerCase().includes(patientName.toLowerCase()) ||
    patientName.toLowerCase().includes(rx.patientName?.toLowerCase() || "")
  );

  const myBilling = billing.filter((bill) =>
    bill.patientName?.toLowerCase().includes(patientName.toLowerCase()) ||
    patientName.toLowerCase().includes(bill.patientName?.toLowerCase() || "")
  );

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoc) return;

    addAppointment({
      patientId: user?.id || "PAT-1001",
      patientName,
      doctorId: selectedDoc.id,
      doctorName: selectedDoc.name,
      department: selectedDoc.department || selectedDoc.specialization,
      date: bookingDate,
      time: bookingTime,
      reason,
      status: "Scheduled"
    });

    setSelectedDoc(null);
    setActiveTab("appointments");
  };

  return (
    <div className="space-y-6">
      {/* Patient Welcome Header */}
      <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--brand-primary)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="brand-icon" style={{ width: "48px", height: "48px" }}>
            <IconStethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Welcome back, {patientName}!</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              Patient Portal • Manage appointments, digital prescriptions, and health bills
            </p>
          </div>
        </div>

        <button onClick={() => setActiveTab("book")} className="btn btn-primary btn-md">
          <IconPlus className="w-4 h-4" /> Book New Appointment
        </button>
      </div>

      {/* Patient Navigation Tabs */}
      <div className="card" style={{ padding: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveTab("book")}
          className={`btn ${activeTab === "book" ? "btn-primary" : "btn-secondary"} btn-sm`}
        >
          <IconSearch className="w-4 h-4" /> Find Doctor & Book ({doctors.length})
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className={`btn ${activeTab === "appointments" ? "btn-primary" : "btn-secondary"} btn-sm`}
        >
          <IconCalendar className="w-4 h-4" /> My Appointments ({myAppointments.length})
        </button>

        <button
          onClick={() => setActiveTab("prescriptions")}
          className={`btn ${activeTab === "prescriptions" ? "btn-primary" : "btn-secondary"} btn-sm`}
        >
          <IconFileText className="w-4 h-4" /> My Prescriptions ({myPrescriptions.length})
        </button>

        <button
          onClick={() => setActiveTab("billing")}
          className={`btn ${activeTab === "billing" ? "btn-primary" : "btn-secondary"} btn-sm`}
        >
          <IconDollarSign className="w-4 h-4" /> Billing & Invoices ({myBilling.length})
        </button>
      </div>

      {/* TAB 1: FIND DOCTOR & BOOK APPOINTMENT */}
      {activeTab === "book" && (
        <div className="space-y-4">
          {/* Search & Filter controls */}
          <div className="card" style={{ padding: "1rem 1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div className="search-input-wrapper" style={{ maxWidth: "340px" }}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search doctor by name or specialty..."
                value={searchDoc}
                onChange={(e) => setSearchDoc(e.target.value)}
                className="form-control"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
              {["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "General Medicine"].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`btn ${selectedSpecialty === spec ? "btn-primary" : "btn-secondary"} btn-sm`}
                  style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid Cards */}
          <div className="grid-3" style={{ gap: "1.25rem" }}>
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="card" style={{ padding: "1.35rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--brand-primary)" }}>{doc.name}</h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>{doc.specialization}</p>
                    </div>
                    <span className="badge badge-info">${doc.consultationFee} Fee</span>
                  </div>

                  <div className="space-y-2" style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                    <div><strong>Department:</strong> {doc.department}</div>
                    <div><strong>Experience:</strong> {doc.experience || "10+ Years"}</div>
                    <div><strong>Schedule:</strong> {doc.availability}</div>
                  </div>
                </div>

                <div style={{ paddingTop: "0.85rem", borderTop: "1px solid var(--border-main)" }}>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <IconCalendar className="w-4 h-4" /> Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY APPOINTMENTS */}
      {activeTab === "appointments" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconCalendar className="w-5 h-5 text-sky-500" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Scheduled Appointments</h3>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Assigned Doctor</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                      You have no booked appointments. Click "Find Doctor & Book" to schedule one!
                    </td>
                  </tr>
                ) : (
                  myAppointments.map((apt) => (
                    <tr key={apt.id}>
                      <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>{apt.id}</td>
                      <td style={{ fontWeight: "700", color: "var(--brand-primary)" }}>{apt.doctorName}</td>
                      <td>{apt.department}</td>
                      <td style={{ fontSize: "0.825rem" }}>{apt.date} • {apt.time}</td>
                      <td style={{ fontSize: "0.825rem", maxWidth: "240px" }}>{apt.reason}</td>
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
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MY PRESCRIPTIONS */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          {myPrescriptions.length === 0 ? (
            <div className="card" style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-muted)" }}>
              No digital prescriptions recorded yet.
            </div>
          ) : (
            myPrescriptions.map((rx) => (
              <div key={rx.id} className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--success-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-main)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                  <div>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-muted)" }}>{rx.id}</span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success-color)" }}>Issued by {rx.doctorName}</h3>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Date: {rx.date}</span>
                </div>

                <div className="space-y-2" style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Prescribed Medications</h4>
                  {rx.medications?.map((m, idx) => (
                    <div key={idx} style={{ padding: "0.75rem 1rem", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: "700", color: "var(--brand-primary)", fontSize: "0.9rem" }}>{m.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{m.dosage} • {m.duration}</div>
                      </div>
                      <span className="badge badge-info">{m.instructions || "As advised"}</span>
                    </div>
                  ))}
                </div>

                {rx.notes && (
                  <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", background: "var(--brand-primary-light)", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--brand-primary)" }}>
                    <strong>Doctor's Instructions:</strong> {rx.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: BILLING & INVOICES */}
      {activeTab === "billing" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconDollarSign className="w-5 h-5 text-sky-500" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Patient Medical Statements & Bills</h3>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Description / Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myBilling.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                      No pending medical bills on record.
                    </td>
                  </tr>
                ) : (
                  myBilling.map((bill) => (
                    <tr key={bill.id}>
                      <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>{bill.id}</td>
                      <td style={{ fontSize: "0.85rem" }}>Medical Care & Consultation • Due {bill.dueDate}</td>
                      <td style={{ fontWeight: "800", color: "var(--success-color)", fontSize: "0.95rem" }}>${bill.total?.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${bill.status === "Paid" ? "badge-success" : "badge-warning"}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>
                        {bill.status === "Unpaid" ? (
                          <button
                            onClick={() => updateBillingStatus(bill.id, "Paid")}
                            className="btn btn-primary btn-sm"
                            style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}
                          >
                            Pay Online Now
                          </button>
                        ) : (
                          <span style={{ fontSize: "0.8rem", color: "var(--success-color)", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <IconCheck className="w-4 h-4" /> Paid in Full
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
      )}

      {/* BOOKING MODAL */}
      {selectedDoc && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelectedDoc(null); }}>
          <div className="modal-box">
            <button
              onClick={() => setSelectedDoc(null)}
              className="modal-close-btn"
            >
              <IconX className="w-5 h-5" />
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "0.25rem" }}>Book Doctor Consultation</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--brand-primary)", fontWeight: "600", marginBottom: "1.25rem" }}>
              {selectedDoc.name} • {selectedDoc.specialization} (${selectedDoc.consultationFee} Fee)
            </p>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Preferred Appointment Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="form-control"
                >
                  <option>09:00 AM</option>
                  <option>10:30 AM</option>
                  <option>01:30 PM</option>
                  <option>03:00 PM</option>
                  <option>04:30 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Reason for Visit / Symptoms</label>
                <textarea
                  rows="3"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="button" onClick={() => setSelectedDoc(null)} className="btn btn-secondary btn-md">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-md">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
