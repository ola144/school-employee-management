import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import LeaveList from "./components/LeaveList";
import LeaveForm from "./components/LeaveForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow p-4 flex md:justify-between items-center sm:flex-nowrap flex-wrap justify-center">
      <div className="container flex items-center gap-4">
        <Link to="/" className="font-bold">
          School HR
        </Link>
        {user && (
          <>
            <Link to="/employees" className="text-sm">
              Employees
            </Link>
            <Link to="/leaves" className="text-sm">
              Leaves
            </Link>
          </>
        )}
      </div>
      <div className="container flex justify-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm">
              {user.name} ({user.role})
            </div>
            <button
              onClick={logout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <div className="container p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <EmployeeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/new"
                element={
                  <ProtectedRoute requiredRole={["admin"]}>
                    <EmployeeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/edit/:id"
                element={
                  <ProtectedRoute requiredRole={["admin"]}>
                    <EmployeeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaves"
                element={
                  <ProtectedRoute>
                    <LeaveList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaves/new"
                element={
                  <ProtectedRoute>
                    <LeaveForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaves/edit/:id"
                element={
                  <ProtectedRoute requiredRole={["manager", "admin"]}>
                    <LeaveForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>{" "}
    </>
  );
}

export default App;
