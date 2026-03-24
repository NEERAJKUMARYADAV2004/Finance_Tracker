# Offline-First AI Finance Tracker

A production-grade, entirely offline, AI-first expense tracker mimicking on-device artificial intelligence characteristics. The application focuses on ultra-fast performance, zero network footprint, and a dark luxury aesthetic design system. 

Built with React JS, Vite, and Zustand for state persistence.

## 🌟 Core Features

- **Offline-First Architecture**: No backend, no APIs, no server delays. Everything operates securely within your browser's `localStorage` engine.
- **Robust Authentication Vault**: Multi-mode sign-in flow. Register an offline account (Name, Email, Password), automatically sign back in with your credentials, or quickly unlock your app bypassing the password using a secure 4-digit App Lock PIN.
- **Intelligent Category Taxonomy**: Supports comprehensive default categories (Housing, Utilities, Food, Healthcare, Utilities, etc.) beautifully mapped to intuitive `lucide-react` line-art icons. Select the "Other" option to generate an inline custom category that dynamically saves and persists for future transactions.
- **AI Simulator Overlay**: Simulates NLP text parsing and offline voice intents directly on-device seamlessly without external models.
- **Strict Performance Rules**: Completely CSS-animation and transition free (`* { transition: none }`), resulting in instantaneous state snaps perfectly fitted for a luxury fast tracker interface.
- **Data Export & Import JSON**: Easily backup your entire local storage history via the Profile page by exporting a raw JSON database slice, and restore it later anytime using the specialized 'Import Data' injector tool.

## 🏗 Architecture

* **Framework**: React 19 + Vite
* **State Management**: Zustand v5 (Native `.persist` Middleware hooks directly onto Storage API maintaining intelligent cache merges natively).
* **Routing**: React Router DOM (With custom reload hydration to skip flashes)
* **Icons**: `lucide-react` (Line art stroke-based uniform icons mathematically matched backwards compatibly to your timeline).
* **Styling**: Tailwind CSS v3 (Custom `#D4AF37` / `#0D0D0D` color system mapped without Framer or Animation frameworks).

---

## 🚀 Instructions to Run

### 1. Prerequisites
Ensure you have Node.js installed on your machine (`v18` or newer is recommended).

### 2. Install Packages
Navigate to the repository folder and install all essential packages using npm:

```bash
npm install
```

*This project relies explicitly on the following dependencies:*
- `react`, `react-dom`
- `react-router-dom` (Offline persistent Navigation)
- `zustand` (State logic and local storage middleware hooks)
- `lucide-react` (SVG UI line-art icon mappings)
- `tailwindcss@^3.4`, `postcss`, `autoprefixer` (Design system standard v3 setup specifically tailored to zero-animation layouts)
- `clsx`, `tailwind-merge` (Classname utilities)

### 3. Start Development Server
Once the modules are installed, start the Vite development environment:

```bash
npm run dev
```

The app will now be accessible instantaneously at `http://localhost:5173`. Any reload commands maintain your custom route structure exactly.

## 📁 Folder Structure

```text
src/
├── components/
│   ├── Layout/      (Bottom Nav, Master wrapper, Persistence hooks)
│   └── UI/          (Core Reusable Cards, Buttons, Inputs)
├── features/
│   ├── dashboard/   (Widgets, Overview logic, Dynamic Category Mappers)
│   ├── expenses/    (Form models, list grids, dynamic 'Other' inserts)
│   ├── input/       (AI Smart Inputs, Camera mocks)
│   ├── auth/        (Login logic, Secure Profile UI, JSON importers)
│   └── privacy/     (App lock layer, PIN masking tools)
├── hooks/           (Route persist logic mapped to Local Storage auth)
├── pages/           (Root view containers wrapping feature subsets)
├── store/           (Zustand schema containing offline multi-user databases)
├── styles/          (CSS global resets mapping overrides to Tailwind rules)
└── utils/           (CN structure hooks and global category icon dictionaries)
```
