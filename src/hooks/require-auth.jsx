/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import checkTokenExpiration from "./token-validate";
import UserHook from "./user-hook";

function RequireAuth({ children, ...props }) {
  checkTokenExpiration();
  UserHook();
  const AuthToken = localStorage.getItem("auth_token");
  const location = useLocation();
  if (AuthToken) {
    return <React.Fragment {...props}>{children}</React.Fragment>;
  }
  return (
    <Navigate
      {...props}
      to="auth/login"
      state={location.pathname}
      replace={true}
    />
  );
}

export default RequireAuth;
