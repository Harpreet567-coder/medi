/**
 * Storage service for LocalStorage operations with error handling
 */

export const getItem = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading LocalStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to LocalStorage key "${key}":`, error);
  }
};

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing LocalStorage key "${key}":`, error);
  }
};

export const STORAGE_KEYS = {
  AUTH: "medicare_auth",
  PATIENTS: "medicare_patients",
  DOCTORS: "medicare_doctors",
  APPOINTMENTS: "medicare_appointments",
  PRESCRIPTIONS: "medicare_prescriptions",
  BILLING: "medicare_billing",
  NOTIFICATIONS: "medicare_notifications",
  SETTINGS: "medicare_settings",
  THEME: "medicare_theme",
  DEPARTMENTS: "medicare_departments",
  MEDICAL_RECORDS: "medicare_medical_records",
  STAFF: "medicare_staff"
};
