/**
 * Utility functions for hospital management calculations
 * Demonstrates ES6+ array methods: map, filter, reduce, find
 */

// Calculate total revenue from billing records
export const calculateTotalRevenue = (billingList = []) => {
  return billingList.reduce((acc, bill) => acc + (Number(bill.total) || 0), 0);
};

// Calculate total collected (Paid status)
export const calculatePaidRevenue = (billingList = []) => {
  return billingList
    .filter((bill) => bill.status === "Paid")
    .reduce((acc, bill) => acc + (Number(bill.total) || 0), 0);
};

// Calculate pending revenue
export const calculatePendingRevenue = (billingList = []) => {
  return billingList
    .filter((bill) => bill.status === "Pending" || bill.status === "Partially Paid")
    .reduce((acc, bill) => acc + (Number(bill.total) || 0), 0);
};

// Calculate bed occupancy statistics
export const calculateBedStats = (departments = []) => {
  const totalBeds = departments.reduce((acc, d) => acc + (Number(d.totalBeds) || 0), 0);
  const availableBeds = departments.reduce((acc, d) => acc + (Number(d.availableBeds) || 0), 0);
  const occupiedBeds = totalBeds - availableBeds;
  const occupancyPercentage = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  return { totalBeds, availableBeds, occupiedBeds, occupancyPercentage };
};

// Calculate appointment counts by status
export const calculateAppointmentStats = (appointments = []) => {
  const scheduled = appointments.filter((a) => a.status === "Scheduled").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const total = appointments.length;

  return { scheduled, completed, cancelled, pending, total };
};

// Calculate patient demographics
export const calculatePatientStats = (patients = []) => {
  const total = patients.length;
  const admitted = patients.filter((p) => p.status === "Admitted").length;
  const outpatient = patients.filter((p) => p.status === "Outpatient").length;
  const discharged = patients.filter((p) => p.status === "Discharged").length;

  return { total, admitted, outpatient, discharged };
};

// Format currency
export const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(amount);
};
