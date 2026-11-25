import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getItem, setItem, STORAGE_KEYS } from "../services/storage";
import { initialPatients } from "../data/patients";
import { initialDoctors } from "../data/doctors";
import { initialAppointments } from "../data/appointments";
import { initialDepartments } from "../data/departments";
import { initialBilling } from "../data/billing";
import { initialPrescriptions } from "../data/prescriptions";
import { initialMedicalRecords } from "../data/medicalRecords";
import { initialNotifications } from "../data/notifications";
import { initialStaff } from "../data/staff";

const HospitalContext = createContext(null);

const initialBeds = [
  { id: "BED-101", ward: "ICU Unit 1", room: "ICU-A", status: "Occupied", patientName: "Marcus Vance", patientId: "PAT-1001" },
  { id: "BED-102", ward: "ICU Unit 1", room: "ICU-A", status: "Occupied", patientName: "Jane Smith", patientId: "PAT-1002" },
  { id: "BED-103", ward: "ICU Unit 1", room: "ICU-B", status: "Available", patientName: null, patientId: null },
  { id: "BED-201", ward: "General Ward A", room: "GW-101", status: "Available", patientName: null, patientId: null },
  { id: "BED-202", ward: "General Ward A", room: "GW-101", status: "Occupied", patientName: "Alice Johnson", patientId: "PAT-1003" },
  { id: "BED-203", ward: "General Ward A", room: "GW-102", status: "Cleaning", patientName: null, patientId: null },
  { id: "BED-301", ward: "Pediatric Care", room: "PED-01", status: "Available", patientName: null, patientId: null },
  { id: "BED-302", ward: "Pediatric Care", room: "PED-02", status: "Occupied", patientName: "Tommy Davis", patientId: "PAT-1005" }
];

export const HospitalProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => getItem(STORAGE_KEYS.PATIENTS, initialPatients));
  const [doctors, setDoctors] = useState(() => getItem(STORAGE_KEYS.DOCTORS, initialDoctors));
  const [appointments, setAppointments] = useState(() => getItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments));
  const [departments, setDepartments] = useState(() => getItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments));
  const [billing, setBilling] = useState(() => getItem(STORAGE_KEYS.BILLING, initialBilling));
  const [prescriptions, setPrescriptions] = useState(() => getItem(STORAGE_KEYS.PRESCRIPTIONS, initialPrescriptions));
  const [medicalRecords, setMedicalRecords] = useState(() => getItem(STORAGE_KEYS.MEDICAL_RECORDS, initialMedicalRecords));
  const [notifications, setNotifications] = useState(() => getItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications));
  const [staff, setStaff] = useState(() => getItem(STORAGE_KEYS.STAFF, initialStaff));
  const [beds, setBeds] = useState(() => getItem("medicare_beds", initialBeds));
  const [toasts, setToasts] = useState([]);

  // Toast Management
  const addToast = useCallback((message, type = "info", title = "") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, title }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Synchronize state with LocalStorage
  useEffect(() => setItem(STORAGE_KEYS.PATIENTS, patients), [patients]);
  useEffect(() => setItem(STORAGE_KEYS.DOCTORS, doctors), [doctors]);
  useEffect(() => setItem(STORAGE_KEYS.APPOINTMENTS, appointments), [appointments]);
  useEffect(() => setItem(STORAGE_KEYS.DEPARTMENTS, departments), [departments]);
  useEffect(() => setItem(STORAGE_KEYS.BILLING, billing), [billing]);
  useEffect(() => setItem(STORAGE_KEYS.PRESCRIPTIONS, prescriptions), [prescriptions]);
  useEffect(() => setItem(STORAGE_KEYS.MEDICAL_RECORDS, medicalRecords), [medicalRecords]);
  useEffect(() => setItem(STORAGE_KEYS.NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => setItem(STORAGE_KEYS.STAFF, staff), [staff]);
  useEffect(() => setItem("medicare_beds", beds), [beds]);

  // PATIENT CRUD
  const addPatient = (patientData) => {
    const newPatient = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      admissionDate: new Date().toISOString().split("T")[0],
      status: "Admitted",
      roomNumber: "GEN-" + Math.floor(100 + Math.random() * 900),
      ...patientData
    };
    setPatients((prev) => [newPatient, ...prev]);
    addToast(`Patient ${newPatient.name} added successfully!`, "success", "Patient Created");
    return newPatient;
  };

  const updatePatient = (id, updatedData) => {
    setPatients((prev) =>
      prev.map((patient) => (patient.id === id ? { ...patient, ...updatedData } : patient))
    );
    addToast("Patient information updated successfully.", "info", "Patient Updated");
  };

  const deletePatient = (id) => {
    const patientToDelete = patients.find((p) => p.id === id);
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
    addToast(`Patient ${patientToDelete?.name || id} deleted.`, "warning", "Patient Removed");
  };

  // DOCTOR CRUD
  const addDoctor = (doctorData) => {
    const newDoctor = {
      id: `DOC-${Math.floor(2000 + Math.random() * 9000)}`,
      status: "Active",
      ...doctorData
    };
    setDoctors((prev) => [newDoctor, ...prev]);
    addToast(`Dr. ${newDoctor.name} added to hospital roster! Available for booking.`, "success", "Doctor Registered");
    return newDoctor;
  };

  const updateDoctor = (id, updatedData) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updatedData } : doc))
    );
    addToast("Doctor details updated.", "info", "Doctor Updated");
  };

  const deleteDoctor = (id) => {
    const doc = doctors.find((d) => d.id === id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    addToast(`Dr. ${doc?.name || id} removed from staff.`, "warning", "Doctor Removed");
  };

  // APPOINTMENT CRUD
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: `APT-${Math.floor(3000 + Math.random() * 9000)}`,
      status: "Scheduled",
      createdDate: new Date().toISOString().split("T")[0],
      ...appointmentData
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    addToast(`Appointment booked with ${newAppointment.doctorName || 'Doctor'} on ${newAppointment.date}!`, "success", "Appointment Scheduled");
    return newAppointment;
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updatedData } : apt))
    );
    addToast("Appointment updated.", "info", "Appointment Updated");
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "Cancelled" } : apt))
    );
    addToast("Appointment marked as cancelled.", "warning", "Appointment Cancelled");
  };

  // PRESCRIPTION CRUD
  const addPrescription = (prescriptionData) => {
    const newRx = {
      id: `RX-${Math.floor(6000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
      ...prescriptionData
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    addToast(`Prescription issued to ${newRx.patientName}.`, "success", "Prescription Saved");
    return newRx;
  };

  // BILLING CRUD
  const addBilling = (billingData) => {
    const consultationFee = Number(billingData.consultationFee) || 0;
    const medicineCost = Number(billingData.medicineCost) || 0;
    const roomCharges = Number(billingData.roomCharges) || 0;
    const labCharges = Number(billingData.labCharges) || 0;
    const subtotal = consultationFee + medicineCost + roomCharges + labCharges;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const newBill = {
      id: `INV-${Math.floor(5000 + Math.random() * 9000)}`,
      consultationFee,
      medicineCost,
      roomCharges,
      labCharges,
      tax,
      total,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      paymentDate: billingData.status === "Paid" ? new Date().toISOString().split("T")[0] : "N/A",
      paymentMethod: billingData.status === "Paid" ? "Credit Card" : "Unpaid",
      ...billingData
    };

    setBilling((prev) => [newBill, ...prev]);
    addToast(`Invoice ${newBill.id} generated ($${newBill.total}).`, "success", "Invoice Generated");
    return newBill;
  };

  const updateBillingStatus = (id, newStatus) => {
    setBilling((prev) =>
      prev.map((bill) => {
        if (bill.id === id) {
          return {
            ...bill,
            status: newStatus,
            paymentDate: newStatus === "Paid" ? new Date().toISOString().split("T")[0] : bill.paymentDate,
            paymentMethod: newStatus === "Paid" ? "Online Transfer" : bill.paymentMethod
          };
        }
        return bill;
      })
    );
    addToast(`Invoice ${id} marked as ${newStatus}.`, "info", "Payment Status");
  };

  // BEDS CRUD
  const updateBedStatus = (bedId, status, patientName = null, patientId = null) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === bedId ? { ...b, status, patientName, patientId } : b))
    );
    addToast(`Bed ${bedId} updated to ${status}.`, "info", "Bed Status Updated");
  };

  // STAFF CRUD
  const addStaff = (staffData) => {
    const newStaff = {
      id: `STF-${Math.floor(9000 + Math.random() * 9000)}`,
      status: "Active",
      ...staffData
    };
    setStaff((prev) => [newStaff, ...prev]);
    addToast(`Staff member ${newStaff.name} added.`, "success", "Staff Onboarded");
    return newStaff;
  };

  const deleteStaff = (id) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    addToast("Staff record removed.", "warning");
  };

  return (
    <HospitalContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        departments,
        billing,
        prescriptions,
        medicalRecords,
        notifications,
        staff,
        beds,
        toasts,
        addToast,
        removeToast,
        addPatient,
        updatePatient,
        deletePatient,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        addPrescription,
        addBilling,
        updateBillingStatus,
        updateBedStatus,
        addStaff,
        deleteStaff
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
};
