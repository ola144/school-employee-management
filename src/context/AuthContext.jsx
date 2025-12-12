/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockApi } from "../utils/mockApi";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

const demoUsers = [
  {
    id: "u1",
    name: "Admin Alice",
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: "u2",
    name: "Manager Mary",
    username: "manager",
    password: "manager",
    role: "manager",
  },
  {
    id: "u3",
    name: "Employee Ed",
    username: "employee",
    password: "employee",
    role: "employee",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const u = JSON.parse(atob(token));

      Promise.resolve().then(() => {
        setUser(u);
      });
    } catch (e) {
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (username, password) => {
    // mock authentication
    const found = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    const token = btoa(
      JSON.stringify({ id: found.id, name: found.name, role: found.role })
    );
    localStorage.setItem("token", token);
    setUser({ id: found.id, name: found.name, role: found.role });
    return token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
