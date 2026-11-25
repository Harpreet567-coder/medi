/**
 * Mock API service simulating asynchronous server requests using Promises & async/await.
 * Interacts with LocalStorage or falls back to initial JS seed datasets.
 */

import { getItem, setItem, STORAGE_KEYS } from "./storage";
import { initialPatients } from "../data/patients";
import { initialDoctors } from "../data/doctors";
import { initialAppointments } from "../data/appointments";
import { initialDepartments } from "../data/departments";
import { initialBilling } from "../data/billing";
import { initialPrescriptions } from "../data/prescriptions";
import { initialMedicalRecords } from "../data/medicalRecords";
import { initialNotifications } from "../data/notifications";
import { initialStaff } from "../data/staff";

// Helper delay to simulate network latency
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPatients = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.PATIENTS);
  if (!data || data.length === 0) {
    data = initialPatients;
    setItem(STORAGE_KEYS.PATIENTS, data);
  }
  return data;
};

export const fetchDoctors = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.DOCTORS);
  if (!data || data.length === 0) {
    data = initialDoctors;
    setItem(STORAGE_KEYS.DOCTORS, data);
  }
  return data;
};

export const fetchAppointments = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.APPOINTMENTS);
  if (!data || data.length === 0) {
    data = initialAppointments;
    setItem(STORAGE_KEYS.APPOINTMENTS, data);
  }
  return data;
};

export const fetchDepartments = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.DEPARTMENTS);
  if (!data || data.length === 0) {
    data = initialDepartments;
    setItem(STORAGE_KEYS.DEPARTMENTS, data);
  }
  return data;
};

export const fetchBilling = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.BILLING);
  if (!data || data.length === 0) {
    data = initialBilling;
    setItem(STORAGE_KEYS.BILLING, data);
  }
  return data;
};

export const fetchPrescriptions = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.PRESCRIPTIONS);
  if (!data || data.length === 0) {
    data = initialPrescriptions;
    setItem(STORAGE_KEYS.PRESCRIPTIONS, data);
  }
  return data;
};

export const fetchMedicalRecords = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.MEDICAL_RECORDS);
  if (!data || data.length === 0) {
    data = initialMedicalRecords;
    setItem(STORAGE_KEYS.MEDICAL_RECORDS, data);
  }
  return data;
};

export const fetchNotifications = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.NOTIFICATIONS);
  if (!data || data.length === 0) {
    data = initialNotifications;
    setItem(STORAGE_KEYS.NOTIFICATIONS, data);
  }
  return data;
};

export const fetchStaff = async () => {
  await delay();
  let data = getItem(STORAGE_KEYS.STAFF);
  if (!data || data.length === 0) {
    data = initialStaff;
    setItem(STORAGE_KEYS.STAFF, data);
  }
  return data;
};
