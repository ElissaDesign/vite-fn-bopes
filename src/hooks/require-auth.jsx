// import { useEffect, useState } from "react";
// import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../../redux/slices/authSlice";

export function RequireAuth() {
  //   const navigate = useNavigate();
  //   // const token = useSelector(selectCurrentToken);
  //   const location = useLocation();

  //   const token = window.localStorage.getItem("auth_token");

  //   // useEffect( () =>{
  //   // 	const token= window.localStorage.getItem('auth_token')
  //   // 	if(!token){
  //   // 		navigate('/')
  //   // 	}
  //   // },[])

  //   return token ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="auth/login" state={{ from: location }} replace />
  //   );

  return true;
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
