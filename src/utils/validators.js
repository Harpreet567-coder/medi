/**
 * Form validation utilities for MediCare Hospital System
 */

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  // Accepts standard international/US phone formats
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone).trim());
};

export const validateNotEmpty = (val) => {
  return val !== null && val !== undefined && String(val).trim().length > 0;
};

export const validatePositiveNumber = (val) => {
  const num = Number(val);
  return !isNaN(num) && num > 0;
};

export const validatePatientForm = (formData) => {
  const errors = {};

  if (!validateNotEmpty(formData.name)) {
    errors.name = "Patient full name is required.";
  }

  if (!validatePositiveNumber(formData.age)) {
    errors.age = "Valid age is required.";
  }

  if (!validateNotEmpty(formData.gender)) {
    errors.gender = "Gender selection is required.";
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = "Valid phone number is required (e.g. +1 555-234-5678).";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Valid email address is required.";
  }

  if (!validateNotEmpty(formData.bloodGroup)) {
    errors.bloodGroup = "Blood group is required.";
  }

  if (!validateNotEmpty(formData.department)) {
    errors.department = "Department is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDoctorForm = (formData) => {
  const errors = {};

  if (!validateNotEmpty(formData.name)) {
    errors.name = "Doctor full name is required.";
  }

  if (!validateNotEmpty(formData.specialization)) {
    errors.specialization = "Specialization is required.";
  }

  if (!validateNotEmpty(formData.department)) {
    errors.department = "Department is required.";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Valid email address is required.";
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = "Valid phone number is required.";
  }

  if (!validatePositiveNumber(formData.consultationFee)) {
    errors.consultationFee = "Valid consultation fee is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
