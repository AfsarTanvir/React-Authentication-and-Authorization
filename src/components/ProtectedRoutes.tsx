import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from "@tanstack/react-router";

function ProtectedRoutes({
  children,
  permissions,
  allowGuest = false,
}: {
  children: React.ReactNode;
  permissions?: string[];
  allowGuest?: boolean;
}) {
  const { user, hasPermission } = useAuth();

  //   Allow guest user if `allowGuest` is true
  if (allowGuest && !user) {
    return children;
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to unauthorized if the user lacks required permission
  if (permissions && !permissions.every((p) => hasPermission(p))) {
    permissions.every((p) => {
      console.log(hasPermission(p), p);
      return hasPermission(p);
    })
    return <Navigate to="/unauthorized" />;
  }

  // Render the childern if the user is authenticated And has Permissions
  return children;
}

export default ProtectedRoutes;