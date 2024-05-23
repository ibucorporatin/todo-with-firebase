import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const uid = localStorage.getItem("uid");
  if (!uid) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
