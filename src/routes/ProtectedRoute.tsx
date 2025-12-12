import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }: any) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && !requiredRole.includes(user.role))
    return (
      <div className="text-center mt-10">
        You don't have permission to view this.
      </div>
    );
  return children;
}
