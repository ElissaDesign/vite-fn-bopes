import { Outlet } from "react-router-dom";
import Navbar from "./navBar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
