<div align="center">

# 🔍 JobFinder

### Your Next Career Opportunity, One Click Away

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![NgRx Signals](https://img.shields.io/badge/NgRx_Signals-20-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white)](https://ngrx.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <strong>A modern, responsive job search application built with Angular 20 that connects you to real job listings from the <a href="https://www.arbeitnow.com/">Arbeitnow</a> API.</strong>
</p>

---

</div>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Job Search** | Search thousands of jobs by keyword and location with real-time filtering |
| 📄 **Job Listings** | Browse paginated job cards with title, company, and location details |
| ❤️ **Favorites** | Save interesting job offers to your personal favorites list |
| 📝 **Applications** | Track your job applications with status management (Pending / Accepted / Rejected) |
| 👤 **User Profile** | Update your personal information and manage your account |
| 🔐 **Authentication** | Secure login & registration system with route guards |
| 📱 **Responsive Design** | Fully responsive UI that works seamlessly on desktop, tablet, and mobile |
| ⚡ **Lazy Loading** | All feature modules are lazy-loaded for optimal performance |

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Angular 20 (Standalone Components)
- **Language:** TypeScript 5
- **State Management:** NgRx Signal Store
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Forms:** Angular Reactive Forms
- **Routing:** Angular Router with Guards

### Backend
- **Mock API:** JSON Server (local development)
- **Job Data:** [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api)

### Dev Tools
- **Build:** Angular CLI 20
- **Testing:** Karma + Jasmine
- **Code Style:** Prettier

---

## 🏗 Architecture

The project follows a **feature-based architecture** with clear separation of concerns:

```
┌──────────────────────────────────────────────┐
│                   App Shell                  │
│              (Navbar + Router)               │
├──────────────┬───────────────┬───────────────┤
│   Features   │     Core      │    Shared     │
├──────────────┼───────────────┼───────────────┤
│ • Jobs       │ • Services    │ • Components  │
│ • Auth       │ • Guards      │   - JobCard   │
│ • Favorites  │ • Models      │   - Navbar    │
│ • Apps       │ • Store       │   - SearchBar │
│ • Profile    │ • DB          │ • Pipes       │
└──────────────┴───────────────┴───────────────┘
```

**State Management** is handled via **NgRx Signal Store**, providing reactive, signal-based state for:
- `JobsStore` — Search results, loading states, and pagination
- `FavoritesStore` — User's saved job offers
- `ApplicationsStore` — Tracked job applications

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Angular CLI** ≥ 20.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/JobFinder.git
cd JobFinder

# 2. Install dependencies
npm install
```

### Running the App

You need **two terminals** — one for the mock API server and one for the Angular app:

**Terminal 1 — Start JSON Server (Mock API):**
```bash
npm run jsonserver
```
> Runs on `http://localhost:3000`

**Terminal 2 — Start Angular Dev Server:**
```bash
npm start
```
> Runs on `http://localhost:4200`

### Building for Production

```bash
npm run build
```
Build artifacts are stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── app.config.ts            # App-level providers
│   ├── app.routes.ts            # Route definitions
│   ├── app.ts                   # Root component
│   │
│   ├── core/                    # Singleton services & app-wide logic
│   │   ├── db/                  # JSON Server database
│   │   │   └── db.json
│   │   ├── guards/              # Route guards (Auth)
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── application.model.ts
│   │   │   ├── favorite.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/            # HTTP services
│   │   │   ├── auth.service.ts
│   │   │   ├── job.service.ts
│   │   │   └── application.service.ts
│   │   └── store/               # NgRx Signal Stores
│   │       ├── jobs/
│   │       ├── favorites/
│   │       └── applications/
│   │
│   ├── features/                # Feature modules (lazy-loaded)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── jobs/
│   │   ├── favorites/
│   │   ├── applications/
│   │   └── profile/
│   │
│   └── shared/                  # Reusable components & pipes
│       ├── components/
│       │   ├── jobcard/
│       │   ├── navbar/
│       │   ├── search-bar/
│       │   └── auth-layout.component/
│       └── pipes/
│
├── index.html
├── main.ts
└── styles.css
```

---

## 🌐 API Reference

### Arbeitnow Job Board API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/job-board-api` | Fetch job listings |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | `number` | Page number for pagination |
| `items_per_page` | `number` | Number of results per page |

> Full API docs: [arbeitnow.com/api](https://www.arbeitnow.com/api/job-board-api)

### JSON Server (Local)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/users` | User registration & lookup |
| `PUT` | `/users/:id` | Update user profile |
| `DELETE` | `/users/:id` | Delete user account |
| `GET/POST` | `/favoritesOffers` | Manage favorite job offers |
| `GET/POST` | `/applications` | Manage job applications |

---



<div align="center">

**Built with ❤️ using Angular 20**

[⬆ Back to Top](#-jobfinder)

</div>
