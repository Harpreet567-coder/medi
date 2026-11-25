# MediCare — Hospital Management System (React.js Evaluation-I)

A complete, production-grade **Hospital Management System built entirely with React.js, Vite, React Router DOM, Context API, Vanilla CSS3, and LocalStorage persistence**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd medicare-hospital
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

### 🔑 Demo Admin Credentials

- **Email**: `admin@medicare.com`
- **Password**: `admin123`

---

## 📚 Syllabus & Lecture Evaluation Mapping (Lectures 1–42)

This project has been crafted to serve as an evaluation mapping demonstrating all concepts covered across Lectures 1 through 42:

### 1. Lectures 1–6: HTML5, CSS3, Accessibility & Responsive Layouts
- **Semantic HTML5 Elements**: Uses `<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<footer>` across components ([MainLayout.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/components/layout/MainLayout.jsx), [Sidebar.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/components/layout/Sidebar.jsx)).
- **Accessibility & ARIA**: Implements `aria-label`, `role="dialog"`, `role="status"`, custom focus rings, accessible form labels, and keyboard `Escape` closing on modals ([Modal.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/components/common/Modal.jsx)).
- **CSS3 Box Model, Flexbox & Grid**: Built with custom HSL/HEX CSS variables in [index.css](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/index.css), featuring mobile-first media queries, CSS Grid stat cards, and flex layout sidebar drawers.

### 2. Lectures 7–12: JavaScript Fundamentals & ES6+ Features
- **Modern ES6+ Syntax**: Extensively uses `let`, `const`, arrow functions, template literals, array/object destructuring, rest/spread operators, and ES modules (`import/export`).
- **Functional Methods**: Demonstrates native array methods: `.map()` for list rendering, `.filter()` for search and statuses, `.find()` for route lookups, and `.reduce()` for financial totals ([calculations.js](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/utils/calculations.js)).

### 3. Lectures 13–18: Modules, Promises, Async/Await, Storage & Forms
- **Async Promises & Fetch Simulation**: Service layer [api.js](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/services/api.js) uses `async/await` and delay simulation to fetch initial JSON datasets.
- **LocalStorage Data Persistence**: Persistent state for Patients, Doctors, Appointments, Billing, Prescriptions, Staff, and Theme via `JSON.stringify` / `JSON.parse` in [storage.js](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/services/storage.js).
- **Form Validation**: Fully controlled inputs with real-time error messages in [validators.js](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/utils/validators.js).

### 4. Lectures 19–24: React Setup, Events & Controlled Components
- **Vite React Architecture**: Pure React SPA with component tree structure under `src/components/` and `src/pages/`.
- **Event Handling**: Implements `onClick`, `onChange`, `onSubmit`, `onFocus`, `onBlur`, and backdrop dismissal.

### 5. Lectures 25–30: JSX, Components, Props & Conditional Rendering
- **Component Composition & Reusability**: `<Button>`, `<Modal>`, `<Badge>`, `<SearchBar>`, `<LoadingSpinner>`, `<EmptyState>`, `<Toast>`, and `<StatCard>`.
- **Conditional Rendering**: Displays loading state, empty state cards when zero results found, and conditional badges based on status.

### 6. Lectures 31–36: React Hooks, Custom Hooks & Context API
- **`useState`**: Extensively manages local input state, modal visibility, current filters, toast arrays, and form data.
- **`useEffect`**: Synchronizes local state to LocalStorage, manages Escape key listeners, and document theme attributes.
- **`useRef`**: Auto-focuses search inputs on mount in [SearchBar.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/components/common/SearchBar.jsx) and references DOM elements.
- **`useMemo`**: Optimizes list filtering in [Patients.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/pages/Patients.jsx) and dynamic revenue/bed statistics in [Dashboard.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/pages/Dashboard.jsx).
- **`useCallback`**: Memoizes table action handlers (`onEdit`, `onDelete`, `onCancel`) passed down to child components.
- **Custom Hooks**:
  - `useLocalStorage(key, initialValue)`
  - `useFetch(fetchFn, deps)`
  - `useDebounce(value, delay)`
- **Context API Providers**:
  - `AuthContext`: Login/logout authentication state.
  - `ThemeContext`: Light / Dark mode toggle.
  - `HospitalContext`: Central data store for CRUD operations & toast alerts.

### 7. Lectures 37–42: React Router, Nested Routes, Dynamic Parameters & Security
- **Declarative Router**: Configured using `<BrowserRouter>`, `<Routes>`, and `<Route>` in [App.jsx](file:///Users/ridhamgoyal86gmail.com/.gemini/antigravity/scratch/medicare-hospital/src/App.jsx).
- **Protected Routes**: `<ProtectedRoute>` forces unauthenticated users back to `/login`.
- **Dynamic Route Parameters**: `useParams()` handles `/patients/:patientId`, `/doctors/:doctorId`, and `/appointments/:appointmentId`.
- **Nested Routes & Outlet**: Demonstrates nested routes under `/patients/:patientId` with `<Outlet />` for medical history and appointment tabs.
- **404 Handling**: Wildcard route (`*`) renders custom `<NotFound />` page.

---

## 📁 Project Folder Hierarchy

```text
medicare-hospital/
├── public/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI primitives (Button, Modal, Badge, etc.)
│   │   ├── layout/         # Sidebar, Navbar, Header, MainLayout
│   │   ├── patients/       # PatientTable, PatientForm, PatientCard
│   │   ├── doctors/        # DoctorTable, DoctorForm
│   │   └── appointments/   # AppointmentTable, AppointmentForm
│   ├── context/            # AuthContext, ThemeContext, HospitalContext
│   ├── hooks/              # useLocalStorage, useFetch, useDebounce
│   ├── pages/              # 18 Application Pages & Nested Views
│   ├── data/               # Seed Mock Datasets (15 Patients, 10 Doctors, etc.)
│   ├── services/           # api.js & storage.js
│   ├── utils/              # calculations, validators, helpers
│   ├── App.jsx             # React Router Config
│   ├── main.jsx            # Entry point
│   └── index.css           # CSS Variables & Design System
├── package.json
└── README.md
```

---

## 🛠️ Complete Feature Checklist

- [x] Login Authentication (`admin@medicare.com` / `admin123`)
- [x] Dashboard with Live Calculated Statistics & Occupancy Progress Bars
- [x] Patient Directory with Full CRUD (Add, Edit, Delete, View Profile)
- [x] Dynamic Patient Profiles with Nested Medical Record & Appointment Tabs
- [x] Doctor Directory with Specialization Filters & Schedules
- [x] Appointment Management with Status Flow (Scheduled, Completed, Cancelled)
- [x] Clinical Departments Overview (8 Specializations & Bed Allocation)
- [x] Pharmacy Prescriptions Module
- [x] Electronic Medical Records (EMR)
- [x] Automated Billing System with Formula Calculation & Payment Statuses
- [x] Hospital Nursing & Staff Roster Management
- [x] Reports & Statistical Analytics
- [x] System Notifications Center & Interactive Toast Alerts Stack
- [x] Dark / Light Theme Toggle & Persistent Settings
- [x] Mobile Responsive Hamburger Drawer Navigation
#   m e d i  
 