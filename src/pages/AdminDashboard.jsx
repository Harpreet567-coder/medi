import React, { useState } from "react";
import { useHospital } from "../context/HospitalContext";
import {
  IconUsers,
  IconStethoscope,
  IconCalendar,
  IconDollarSign,
  IconPlus,
  IconTrash,
  IconX,
  IconSearch,
  IconShield,
  IconActivity
} from "../components/common/Icons";

export const AdminDashboard = () => {
  const { doctors, patients, staff, appointments, billing, addDoctor, deleteDoctor, addStaff, deleteStaff } = useHospital();
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchTerm, setSearchTerm] = useState("");

  // Add Doctor Modal State
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [docName, setDocName] = useState("");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [department, setDepartment] = useState("Cardiology");
  const [phone, setPhone] = useState("+1 (555) 019-2831");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("10 Years");
  const [fee, setFee] = useState("150");
  const [availability, setAvailability] = useState("Mon, Wed, Fri (09:00 AM - 04:00 PM)");

  // Add Staff Modal State
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("Registered Nurse");
  const [staffDept, setStaffDept] = useState("Emergency");
  const [staffPhone, setStaffPhone] = useState("+1 (555) 999-1234");

  const totalRevenue = billing.filter(b => b.status === "Paid").reduce((acc, b) => acc + (b.total || 0), 0);

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!docName || !email) return;

    addDoctor({
      name: docName.startsWith("Dr.") ? docName : `Dr. ${docName}`,
      specialization: specialty,
      department: department || specialty,
      phone,
      email,
      experience,
      consultationFee: Number(fee) || 150,
      availability
    });

    setShowDoctorModal(false);
    setDocName("");
    setEmail("");
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffName) return;

    addStaff({
      name: staffName,
      role: staffRole,
      department: staffDept,
      phone: staffPhone
    });

    setShowStaffModal(false);
    setStaffName("");
  };

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid-4" style={{ gap: "1.25rem" }}>
        <div className="stat-card">
          <div>
            <span className="stat-title">Active Doctors</span>
            <div className="stat-value" style={{ color: "var(--brand-primary)" }}>{doctors.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Specialists on roster</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--brand-primary-light)", color: "var(--brand-primary)" }}>
            <IconStethoscope className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Patients Enrolled</span>
            <div className="stat-value" style={{ color: "var(--success-color)" }}>{patients.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Registered accounts</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--success-light)", color: "var(--success-color)" }}>
            <IconUsers className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Total Appointments</span>
            <div className="stat-value" style={{ color: "#6366f1" }}>{appointments.length}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Bookings processed</span>
          </div>
          <div className="stat-icon" style={{ background: "rgba(99, 102, 241, 0.12)", color: "#6366f1" }}>
            <IconCalendar className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Settled Revenue</span>
            <div className="stat-value" style={{ color: "var(--warning-color)" }}>${totalRevenue.toLocaleString()}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Paid medical invoices</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--warning-light)", color: "var(--warning-color)" }}>
            <IconDollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="card" style={{ padding: "0.85rem 1.15rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`btn ${activeTab === "doctors" ? "btn-primary" : "btn-secondary"} btn-sm`}
          >
            <IconStethoscope className="w-4 h-4" /> Doctors ({doctors.length})
          </button>

          <button
            onClick={() => setActiveTab("staff")}
            className={`btn ${activeTab === "staff" ? "btn-primary" : "btn-secondary"} btn-sm`}
          >
            <IconUsers className="w-4 h-4" /> Hospital Staff ({staff.length})
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`btn ${activeTab === "appointments" ? "btn-primary" : "btn-secondary"} btn-sm`}
          >
            <IconCalendar className="w-4 h-4" /> Appointments ({appointments.length})
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <div className="search-input-wrapper" style={{ width: "220px" }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ fontSize: "0.825rem", padding: "0.45rem 0.75rem 0.45rem 2.25rem" }}
            />
          </div>

          {activeTab === "doctors" && (
            <button onClick={() => setShowDoctorModal(true)} className="btn btn-primary btn-sm">
              <IconPlus className="w-4 h-4" /> Add Doctor
            </button>
          )}

          {activeTab === "staff" && (
            <button onClick={() => setShowStaffModal(true)} className="btn btn-primary btn-sm">
              <IconPlus className="w-4 h-4" /> Add Staff
            </button>
          )}
        </div>
      </div>

      {/* DOCTORS TABLE */}
      {activeTab === "doctors" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Hospital Doctor Roster</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Registered doctors sync in real-time to patient appointment bookings</span>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialty</th>
                  <th>Department</th>
                  <th>Consultation Fee</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id}>
                    <td style={{ fontWeight: "700", color: "var(--brand-primary)" }}>{doc.name}</td>
                    <td>{doc.specialization}</td>
                    <td>{doc.department}</td>
                    <td style={{ fontWeight: "800", color: "var(--text-main)" }}>${doc.consultationFee}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{doc.availability}</td>
                    <td>
                      <span className={`badge ${doc.status === "Active" ? "badge-success" : "badge-warning"}`}>
                        {doc.status || "Active"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteDoctor(doc.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                        title="Remove Doctor from Directory"
                      >
                        <IconTrash className="w-3.5 h-3.5" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STAFF TABLE */}
      {activeTab === "staff" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Hospital Personnel & Staff Directory</h3>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Designation / Role</th>
                  <th>Department</th>
                  <th>Contact Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((st) => (
                  <tr key={st.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>{st.id}</td>
                    <td style={{ fontWeight: "700" }}>{st.name}</td>
                    <td style={{ color: "var(--brand-primary)", fontWeight: "600" }}>{st.role}</td>
                    <td>{st.department}</td>
                    <td style={{ fontSize: "0.85rem" }}>{st.phone}</td>
                    <td>
                      <button
                        onClick={() => deleteStaff(st.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                      >
                        <IconTrash className="w-3.5 h-3.5" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* APPOINTMENTS TABLE */}
      {activeTab === "appointments" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Hospital Appointment Logs</h3>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Assigned Doctor</th>
                  <th>Department</th>
                  <th>Schedule</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>{apt.id}</td>
                    <td style={{ fontWeight: "700" }}>{apt.patientName}</td>
                    <td style={{ color: "var(--brand-primary)", fontWeight: "600" }}>{apt.doctorName}</td>
                    <td>{apt.department}</td>
                    <td style={{ fontSize: "0.85rem" }}>{apt.date} • {apt.time}</td>
                    <td>
                      <span className={`badge ${apt.status === "Completed" ? "badge-success" : apt.status === "Cancelled" ? "badge-danger" : "badge-info"}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD DOCTOR MODAL */}
      {showDoctorModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowDoctorModal(false); }}>
          <div className="modal-box">
            <button onClick={() => setShowDoctorModal(false)} className="modal-close-btn">
              <IconX className="w-5 h-5" />
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "0.25rem" }}>Register New Doctor</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>Add a medical specialist to the active directory</p>

            <form onSubmit={handleAddDoctorSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Elena Rostova"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Specialty</label>
                  <select
                    value={specialty}
                    onChange={(e) => { setSpecialty(e.target.value); setDepartment(e.target.value); }}
                    className="form-control"
                  >
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                    <option>Dermatology</option>
                    <option>General Medicine</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="doctor@medicare.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Availability Schedule</label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowDoctorModal(false)} className="btn btn-secondary btn-md">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-md">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {showStaffModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowStaffModal(false); }}>
          <div className="modal-box">
            <button onClick={() => setShowStaffModal(false)} className="modal-close-btn">
              <IconX className="w-5 h-5" />
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "0.25rem" }}>Onboard Staff Member</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>Add nurse or administrative hospital personnel</p>

            <form onSubmit={handleAddStaffSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Nurse Jessica Alba"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Role / Designation</label>
                  <input
                    type="text"
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Department</label>
                  <select value={staffDept} onChange={(e) => setStaffDept(e.target.value)} className="form-control">
                    <option>Emergency</option>
                    <option>ICU Ward</option>
                    <option>Outpatient</option>
                    <option>Billing & Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowStaffModal(false)} className="btn btn-secondary btn-md">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-md">
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
