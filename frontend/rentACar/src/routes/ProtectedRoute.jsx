import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ProtectedRoute() {
  const { details} = useSelector((state) => state.userDetail);
  const isUser = details.role === "USER";
  const isAdmin = details.role === "ADMIN";
  return <>{isUser || isAdmin ? <Outlet /> : <Navigate to="/login" />}</>;
}
