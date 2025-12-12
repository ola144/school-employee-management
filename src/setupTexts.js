/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "@testing-library/jest-dom";

// --- FILE: src/__tests__/Login.test.jsx ---
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";

test("renders login and shows demo text", () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  expect(screen.getByText(/Demo accounts/i)).toBeInTheDocument();
});

// --- FILE: README.md ---
// # School Employee Management (React + TailwindCSS)

// ## Quick start
// 1. `npm create vite@latest school-employee` (or clone project)
// 2. Replace src/ and public/ files with the ones in this repo.
// 3. Install dependencies: `npm install` (tailwind, postcss, autoprefixer as dev deps)
// 4. Initialize Tailwind: ensure postcss.config.js and tailwind.config.js exist (provided).
// 5. Start: `npm run dev`

// ## Notes
// - This app uses `localStorage` as a mock backend via `src/utils/mockApi.js` and seeds demo data.
// - Authentication is mocked (token = base64 of user payload) for demo. For production use a real backend and JWT.
// - Role-based access: admin can manage employees, manager/admin approve leaves, employees can create leaves and delete their pending leaves.
// - Client-side validation is minimal; expand as needed.

// --- END ---
