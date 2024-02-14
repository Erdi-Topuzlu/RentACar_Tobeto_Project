import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function ({ children }) {
  const { details } = useSelector((state) => state.userDetail);

  if (!details) {
    return <Navigate to="/login" />;
  }
 
  if (details.role) {
    return <Outlet />;
  }

  if (details.role != "ADMIN" || details.role != "USER") {
    return <Navigate to="/home" />;
  }



  return children;
}
