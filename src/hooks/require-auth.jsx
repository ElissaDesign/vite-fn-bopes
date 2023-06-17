/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import checkTokenExpiration from "./token-validate";

function RequireAuth({ children, ...props }) {
  checkTokenExpiration();
  const AuthToken = localStorage.getItem("auth_token");
  const location = useLocation();
  if (AuthToken) {
    return <React.Fragment {...props}>{children}</React.Fragment>;
  }
  return <Navigate {...props} to="auth/login" state={location.pathname} />;
}

export default RequireAuth;
