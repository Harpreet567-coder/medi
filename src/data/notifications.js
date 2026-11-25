export const initialNotifications = [
  {
    id: "NOTIF-8001",
    title: "New Appointment Booked",
    message: "Patient Eleanor Vance scheduled an appointment with Dr. Sarah Jenkins for Aug 20, 09:30 AM.",
    timestamp: "10 minutes ago",
    type: "appointment",
    read: false
  },
  {
    id: "NOTIF-8002",
    title: "Payment Received",
    message: "Invoice INV-5003 paid in full ($351.00) via Insurance Claim.",
    timestamp: "1 hour ago",
    type: "billing",
    read: false
  },
  {
    id: "NOTIF-8003",
    title: "Patient Record Updated",
    message: "Medical record for Marcus Thorne updated by Dr. Robert Chen.",
    timestamp: "3 hours ago",
    type: "patient",
    read: false
  },
  {
    id: "NOTIF-8004",
    title: "Doctor Availability Changed",
    message: "Dr. Marcus Vance status changed to 'On Leave' until Aug 28.",
    timestamp: "5 hours ago",
    type: "system",
    read: true
  },
  {
    id: "NOTIF-8005",
    title: "Emergency Bed Allocation",
    message: "Bed ER-01 assigned to incoming emergency patient Grace Hopper.",
    timestamp: "Yesterday",
    type: "patient",
    read: true
  },
  {
    id: "NOTIF-8006",
    title: "Prescription Renewal Request",
    message: "Prescription RX-6001 for Eleanor Vance renewed for 30 days.",
    timestamp: "Yesterday",
    type: "system",
    read: true
  },
  {
    id: "NOTIF-8007",
    title: "Pending Bill Overdue Notice",
    message: "Invoice INV-5002 ($1,407.00) due date approaching on Aug 28.",
    timestamp: "2 days ago",
    type: "billing",
    read: true
  },
  {
    id: "NOTIF-8008",
    title: "Appointment Cancelled",
    message: "Benjamin Foster cancelled appointment APT-3010 with Dr. Robert Chen.",
    timestamp: "3 days ago",
    type: "appointment",
    read: true
  },
  {
    id: "NOTIF-8009",
    title: "System Maintenance Alert",
    message: "Scheduled Medicare database backup completed successfully.",
    timestamp: "4 days ago",
    type: "system",
    read: true
  },
  {
    id: "NOTIF-8010",
    title: "New Staff Onboarded",
    message: "Nurse Rachel Adams added to Emergency Department night shift.",
    timestamp: "5 days ago",
    type: "system",
    read: true
  }
];
