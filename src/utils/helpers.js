/**
 * General helper functions (ID generators, date formatters, badges)
 */

export const generateId = (prefix = "ITEM") => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
};

export const formatDate = (dateString) => {
  if (!dateString || dateString === "N/A") return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch (err) {
    return dateString;
  }
};

export const getStatusBadgeVariant = (status) => {
  switch (String(status).toLowerCase()) {
    case "active":
    case "admitted":
    case "scheduled":
    case "paid":
    case "completed":
      return "success";
    case "pending":
    case "partially paid":
    case "on leave":
    case "outpatient":
      return "warning";
    case "cancelled":
    case "discharged":
    case "inactive":
    case "unpaid":
      return "danger";
    default:
      return "info";
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
