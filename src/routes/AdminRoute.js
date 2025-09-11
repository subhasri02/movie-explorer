// Custom Wrapper to protect admin only routes
import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <h2 className="p-6 text-red-600">Access Denied</h2>;
  }

  return children;
};

export default AdminRoute;

