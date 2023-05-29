// import { useEffect, useState } from "react";
// import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../../redux/slices/authSlice";

import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
  const getCookieValue = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }

    return null; // Cookie not found
  };

  const cookieValue = getCookieValue("session");

  return cookieValue ? (
    <Outlet />
  ) : (
    <Navigate to="auth/login" state={{ from: location.pathname }} replace />
  );
}

// export function RequireSumperAdmin() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const role = window.localStorage.getItem("role");

//   // useEffect( () =>{
//   // 	const token= window.localStorage.getItem('auth_token')
//   // 	if(!token){
//   // 		navigate('/')
//   // 	}
//   // },[])

//   return role === "superadmin" ? (
//     <Outlet />
//   ) : (
//     <Navigate to="dashboard" state={{ from: location }} replace />
//   );
// }
