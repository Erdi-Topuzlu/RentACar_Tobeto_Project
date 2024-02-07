import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ({ children }) {
  const navigate = useNavigate();
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
