# 🚀 FreeProjectAPI Dashboard

A fully functional **Single Page Application (SPA)** dashboard integrating **14 sandbox REST APIs** from [FreeProjectAPI](https://freeprojectapi.com). Built with pure **HTML5**, **Bootstrap 5**, and **Vanilla JavaScript (ES6+)** — no frameworks, no build tools.

![Dashboard Preview](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![APIs](https://img.shields.io/badge/APIs-14%20Integrated-58a6ff?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [The 14 Applications](#-the-14-applications)
- [Getting Started](#-getting-started)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)

---

## 🌐 Live Demo

Open `index.html` directly in any modern browser — no server required.

> **API Base URL:** `https://api.freeprojectapi.com/api/`

---

## ✨ Features

- **SPA Routing** — Instant page switching via `switchApp()` with no page reloads
- **Dark Theme UI** — Glassmorphism-inspired dark design with CSS custom properties
- **14 Fully Integrated APIs** — Real GET and POST calls with live data
- **Bootstrap Spinners** — Loading indicators on every async data fetch
- **Success/Error Alerts** — Bootstrap `.alert-success` / `.alert-danger` on all form submissions
- **Searchable Sidebar** — Live filter across all 14 apps
- **Responsive Layout** — Mobile hamburger menu with overlay
- **Sticky Topbar** — Breadcrumb navigation updates dynamically per app
- **No Build Step** — Drop into any folder and open in browser

---

## 📁 Project Structure

```
project-api-app/
├── index.html      # Layout: sidebar, topbar, main content area, booking modal
├── app.js          # All logic: router, API helper, 14 module render functions
└── README.md       # This file
```

### `index.html`
- Bootstrap 5.3 CDN (CSS + JS Bundle)
- Bootstrap Icons CDN
- Google Fonts (Inter)
- Dark-themed responsive sidebar with all 14 app links
- `<main id="app-content">` — dynamic render target
- Shared Bootstrap Modal for Bus Booking confirmation
- Custom CSS variables and component overrides (inline `<style>`)

### `app.js`
| Section | Description |
|---------|-------------|
| `BASE` constant | API base URL (`https://api.freeprojectapi.com/api/`) |
| `api()` helper | Generic `fetch()` wrapper for GET/POST with JSON headers |
| `switchApp()` | SPA router — maps app names to render functions |
| `renderHome()` | Dashboard overview with 14 clickable app cards |
| `render*()` × 14 | One render function per application |
| Field-name patches | Runtime overrides to align render functions with real API field names |

---

## 🔌 API Reference

**Base URL:** `https://api.freeprojectapi.com/api/`

| App | GET Endpoint | POST Endpoint |
|-----|-------------|---------------|
| Bank Loan | `BankLoan/GetAllApplications` | `BankLoan/AddNewApplication` |
| Bus Booking | `BusBooking/GetBusSchedules` | `BusBooking/BookBus` |
| College Project | `CollegeProject/getAllProjects` | `CollegeProject/SubmitProject` |
| Ecommerce | `Ecommerce/get-products` | `Ecommerce/add-to-cart` |
| Employee App | `EmployeeApp/GetEmployees` | — |
| Employee Onboarding | `EmployeeOnboarding/GetEmployees` | `EmployeeOnboarding/register` |
| Enquiry | `Enquiry/get-enquiries` | `Enquiry/create-enquiry` |
| Fees Tracking | `FeesTracking/getAllEnrollments` + `GetDashboardStats` | `FeesTracking/addNewEnrollment` |
| Goal Tracker | `GoalTracker/getAllGoalsByUser?userId=1` | `GoalTracker/createGoalWithMilestones` |
| Leave Tracker | `LeaveTracker/GetAllBalances` | `LeaveTracker/request` |
| Project Competition | `ProjectCompetition/project` | `ProjectCompetition/project` |
| Smart Parking | `SmartParking/GetAllParking` | `SmartParking/AddParking` |
| Survey | `Survey/GetAllSurveys` → `Survey/GetSurveyQuestionsWithOptions/{id}` | `Survey/SubmitSurvey` |
| User App | `UserApp/GetAllUsers` | `UserApp/CreateNewUser` |

---

## 📱 The 14 Applications

### 1. 🏦 Bank Loan
Apply for loans using the `ApplicantLoanView` schema. Full application form collecting personal details, PAN, annual income, employment status, and credit score. Lists all applications with status badges (Approved / Rejected / Pending).

### 2. 🚌 Bus Booking
Browse live bus schedules fetched from the API. Click "Book Seat" to open a Bootstrap Modal — fill passenger name, age, gender, and seat number to confirm. Booking posts a `BusBookingViewModel` payload.

### 3. 🎓 College Project
Submit academic projects to a competition. Form collects project title, description, GitHub link, competition ID, and user ID. Lists all submitted projects with status (Approved / Pending / Rejected).

### 4. 🛒 Ecommerce
Full product catalog with live search and category filter. Products fetched from `get-products`. "Add to Cart" button posts to `add-to-cart` with `custId`, `productId`, and `quantity`.

### 5. 👥 Employee App
Searchable employee directory table. Real-time client-side filtering on `fullName`, `departmentName`. Shows employee type badge (Permanent / Contract / Probation).

### 6. 🧙 Employee Onboarding
4-step wizard with animated step indicator:
- Step 1: Personal Info (name, email, DOB, gender)
- Step 2: Job Details (department, designation, salary, company)
- Step 3: Documents (Aadhar, PAN, bank details)
- Step 4: Review & Submit → POST to `EmployeeOnboarding/register`

### 7. 💬 Enquiry
Customer support ticket form. Posts `customerName`, `customerEmail`, `categoryId`, and `message`. Lists all enquiries with status tracking (Open / In Progress / Resolved / Closed).

### 8. 💰 Fees Tracking
Student enrollment management. Dashboard stat cards (total enrolled, received, pending) from `GetDashboardStats`. Add new enrollments with batch ID, total fee, and amount received.

### 9. 🎯 Goal Tracker
Create goals with title, category, frequency, start and target dates. Progress bars rendered per goal using `progressPercentage` from the API. Days-remaining countdown shown per goal.

### 10. 📅 Leave Tracker
Leave request form posting to `LeaveTracker/request` with `employeeId`, `leaveTypeId`, `fromDate`, `toDate`, and reason. Balance summary cards showing available leave per type.

### 11. 🏆 Project Competition
Submit projects to active competitions. Table shows all submissions with rank medals (🥇🥈🥉) for top 3. GitHub link rendered as clickable anchor.

### 12. 🅿️ Smart Parking
Live parking slot grid. Each slot displays occupancy status based on `vehicleNo` / `outTime` from the API. Click any slot to toggle its status (optimistic UI with revert on failure).

### 13. 📋 Survey
Loads all active surveys from `GetAllSurveys`. Clicking "Take Survey" fetches questions with options from `GetSurveyQuestionsWithOptions/{id}`. Paginated one-question-at-a-time flow. Posts `AnswerDto` array on submit.

### 14. 👤 User App
Create new user accounts posting `firstName`, `lastName`, `email`, `userName`, `password`, `phone` to `CreateNewUser`. Lists all registered users in a searchable table.

---

## 🚀 Getting Started

### Option 1 — Open directly (simplest)
```bash
# Clone the repo
git clone https://github.com/sharada-marasinghe/project-api-app.git

# Open in browser
xdg-open index.html        # Linux
open index.html            # macOS
start index.html           # Windows
```

### Option 2 — Local HTTP server (recommended to avoid CORS on some browsers)
```bash
# Python 3
python3 -m http.server 8080

# Then open
http://localhost:8080
```

### Option 3 — VS Code Live Server
Install the **Live Server** extension and click **"Go Live"** from `index.html`.

> **Note:** Internet access is required for Bootstrap CDN and the FreeProjectAPI endpoints.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| HTML5 | — | Semantic structure |
| CSS3 | — | Custom dark theme with CSS variables |
| JavaScript | ES6+ | SPA routing, `fetch()` API calls, DOM manipulation |
| Bootstrap | 5.3.3 | Layout, components, modals, spinners, badges |
| Bootstrap Icons | 1.11.3 | All UI icons |
| Google Fonts (Inter) | — | Typography |

**No frameworks. No build tools. No dependencies beyond Bootstrap CDN.**

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#58a6ff` | Primary interactive colour |
| `--success-custom` | `#3fb950` | Success states, vacant slots |
| `--danger-custom` | `#f85149` | Error states, occupied slots |
| `--warning-custom` | `#d29922` | Pending states, warnings |
| `--surface` | `#161b22` | Card backgrounds |
| `--sidebar-border` | `#21262d` | All borders |

---

## ⚠️ Known Limitations

- **Shared sandbox data** — All users share the same API database. Data submitted by other users will appear in your lists.
- **Some endpoints return empty arrays** — `GoalTracker`, `FeesTracking`, and `LeaveTracker` return `[]` until data is submitted. Submit a record first to see the list populate.
- **CollegeProject GET returns a server error** — The `getAllProjects` endpoint currently returns a null reference error on the server side; this is an upstream API issue.
- **Authentication not implemented** — These are open sandbox APIs; no login is required or implemented.

---

## 📄 License

MIT © 2026 Sharada Marasinghe

---

## 🙏 Acknowledgements

- [FreeProjectAPI](https://freeprojectapi.com) — Sandbox REST APIs
- [Bootstrap](https://getbootstrap.com) — UI framework
- [Bootstrap Icons](https://icons.getbootstrap.com) — Icon library
