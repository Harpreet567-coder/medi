import React, { useState } from "react";
import { useHospital } from "../context/HospitalContext";
import {
  IconBed,
  IconDollarSign,
  IconUserCheck,
  IconPlus,
  IconX,
  IconCheck,
  IconActivity,
  IconShield
} from "../components/common/Icons";

export const StaffDashboard = () => {
  const { beds, updateBedStatus, patients, billing, addBilling, updateBillingStatus } = useHospital();
  const [activeTab, setActiveTab] = useState("beds");
  const [showBillModal, setShowBillModal] = useState(false);

  // Bill Form State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [consultFee, setConsultFee] = useState("150");
  const [medCost, setMedCost] = useState("45");
  const [roomCost, setRoomCost] = useState("200");
  const [labCost, setLabCost] = useState("80");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  const occupiedBeds = beds.filter((b) => b.status === "Occupied");
  const availableBeds = beds.filter((b) => b.status === "Available");

  const handleBillingSubmit = (e) => {
    e.preventDefault();
    const patientObj = patients.find((p) => p.id === selectedPatientId) || patients[0];

    addBilling({
      patientId: patientObj?.id || "PAT-1001",
      patientName: patientObj?.name || "Marcus Vance",
      consultationFee: Number(consultFee),
      medicineCost: Number(medCost),
      roomCharges: Number(roomCost),
      labCharges: Number(labCost),
      status: paymentStatus
    });

    setShowBillModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Staff Stats */}
      <div className="grid-3" style={{ gap: "1.25rem" }}>
        <div className="stat-card">
          <div>
            <span className="stat-title">Total Hospital Beds</span>
            <div className="stat-value" style={{ color: "var(--brand-primary)" }}>{beds.length} Units</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Across all wards</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--brand-primary-light)", color: "var(--brand-primary)" }}>
            <IconBed className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Available & Ready</span>
            <div className="stat-value" style={{ color: "var(--success-color)" }}>{availableBeds.length} Beds</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Clean & unoccupied</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--success-light)", color: "var(--success-color)" }}>
            <IconCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <span className="stat-title">Current Inpatients</span>
            <div className="stat-value" style={{ color: "var(--warning-color)" }}>{occupiedBeds.length} Patients</div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Admitted under care</span>
          </div>
          <div className="stat-icon" style={{ background: "var(--warning-light)", color: "var(--warning-color)" }}>
            <IconUserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="card" style={{ padding: "0.75rem 1rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("beds")}
            className={`btn ${activeTab === "beds" ? "btn-primary" : "btn-secondary"} btn-sm`}
          >
            <IconBed className="w-4 h-4" /> Ward & Bed Management ({beds.length})
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            className={`btn ${activeTab === "billing" ? "btn-primary" : "btn-secondary"} btn-sm`}
          >
            <IconDollarSign className="w-4 h-4" /> Patient Invoices ({billing.length})
          </button>
        </div>

        {activeTab === "billing" && (
          <button onClick={() => setShowBillModal(true)} className="btn btn-primary btn-sm">
            <IconPlus className="w-4 h-4" /> Create Patient Invoice
          </button>
        )}
      </div>

      {/* BEDS TAB */}
      {activeTab === "beds" && (
        <div className="grid-4" style={{ gap: "1.25rem" }}>
          {beds.map((bed) => {
            const isOccupied = bed.status === "Occupied";
            const isCleaning = bed.status === "Cleaning";

            return (
              <div key={bed.id} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.8rem", fontWeight: "700", color: "var(--brand-primary)" }}>{bed.id}</span>
                    <span
                      className={`badge ${
                        isOccupied ? "badge-warning" : isCleaning ? "badge-danger" : "badge-success"
                      }`}
                    >
                      {bed.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "1.05rem", fontWeight: "700" }}>{bed.ward}</h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Room Number: {bed.room}</p>

                  <div style={{ padding: "0.65rem 0.85rem", background: "var(--bg-surface-subtle)", borderRadius: "var(--radius-md)", fontSize: "0.8rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Assigned Patient</div>
                    <div style={{ fontWeight: "700", color: "var(--text-main)", marginTop: "0.15rem" }}>{bed.patientName || "— Vacant —"}</div>
                  </div>
                </div>

                {/* Status Toggle Actions */}
                <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--border-main)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>Action:</span>
                  <div>
                    {isOccupied ? (
                      <button
                        onClick={() => updateBedStatus(bed.id, "Cleaning", null, null)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}
                      >
                        Discharge & Clean
                      </button>
                    ) : (
                      <button
                        onClick={() => updateBedStatus(bed.id, "Occupied", "Patient Admission", "PAT-1001")}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}
                      >
                        Assign Inpatient
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BILLING TAB */}
      {activeTab === "billing" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border-main)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconDollarSign className="w-5 h-5 text-sky-500" />
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Hospital Invoicing & Patient Billing</h3>
          </div>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient Name</th>
                  <th>Total Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Payment Action</th>
                </tr>
              </thead>
              <tbody>
                {billing.map((bill) => (
                  <tr key={bill.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-muted)" }}>{bill.id}</td>
                    <td style={{ fontWeight: "700" }}>{bill.patientName}</td>
                    <td style={{ fontWeight: "800", color: "var(--success-color)" }}>${bill.total?.toLocaleString()}</td>
                    <td style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>{bill.dueDate}</td>
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
                          style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "var(--success-color)", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <IconCheck className="w-4 h-4" /> Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BILLING MODAL */}
      {showBillModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowBillModal(false); }}>
          <div className="modal-box">
            <button
              onClick={() => setShowBillModal(false)}
              className="modal-close-btn"
            >
              <IconX className="w-5 h-5" />
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <IconDollarSign className="w-5 h-5 text-sky-500" /> Create Patient Invoice
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Generate comprehensive medical invoice with breakdown
            </p>

            <form onSubmit={handleBillingSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="form-control"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Consultation Fee ($)</label>
                  <input
                    type="number"
                    required
                    value={consultFee}
                    onChange={(e) => setConsultFee(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Medications ($)</label>
                  <input
                    type="number"
                    required
                    value={medCost}
                    onChange={(e) => setMedCost(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Room / Ward ($)</label>
                  <input
                    type="number"
                    required
                    value={roomCost}
                    onChange={(e) => setRoomCost(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Lab Charges ($)</label>
                  <input
                    type="number"
                    required
                    value={labCost}
                    onChange={(e) => setLabCost(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="Unpaid">Unpaid / Pending</option>
                  <option value="Paid">Paid Immediately</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowBillModal(false)} className="btn btn-secondary btn-md">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-md">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
