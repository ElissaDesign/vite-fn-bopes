/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkTokenExpiration from "./token-validate";
import UserHook from "./user-hook";

function RequireAuth({ children, ...props }) {
  checkTokenExpiration();
  UserHook();
  const navigate = useNavigate();
  const AuthToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!AuthToken) {
      const loginPath = "/auth/login";
      const currentPath = window.location.pathname;
      if (currentPath !== loginPath) {
        navigate(loginPath, { replace: true, state: currentPath });
      }
    }
  }, [AuthToken, navigate]);

  if (AuthToken) {
    return <React.Fragment {...props}>{children}</React.Fragment>;
  }

  return null;
}

export default RequireAuth;
