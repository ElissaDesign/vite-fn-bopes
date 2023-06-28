/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Leftbar from "../components/side-bar";
// import Leftbar from "../components/left-bar";
import Topbar from "../components/top-bar";
import ComingSoon from "../components/coming-soom";
import RequireAuth from "../hooks/require-auth";

const Company = React.lazy(() => import("../components/company"));
const Peaple = React.lazy(() => import("../private-pages/users/peaple"));
const Organizations = React.lazy(() =>
  import("../private-pages/super-admin/organizations")
);
const RegistrationRequests = React.lazy(() =>
  import("../private-pages/super-admin/requests")
);
const Dashboard = React.lazy(() => import("../private-pages/dashboard"));
const Services = React.lazy(() => import("../private-pages/admin/services"));
const Reports = React.lazy(() => import("../private-pages/reports"));
const Settings = React.lazy(() => import("../private-pages/settings"));
const Employees = React.lazy(() => import("../private-pages/admin/employees"));
const BarAccountant = React.lazy(() =>
  import("../private-pages/accountant/bar")
);
const BarManager = React.lazy(() => import("../private-pages/manager/bar"));
const RestaurantAccountant = React.lazy(() =>
  import("../private-pages/accountant/restaurant")
);
const BarEmployee = React.lazy(() => import("../private-pages/employee/bar"));
const RestaurantEmployee = React.lazy(() =>
  import("../private-pages/employee/restaurant")
);

// superadmin links
const Customers = React.lazy(() =>
  import("../private-pages/super-admin/customers")
);

export default function PrivateRoutes() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const departments = JSON.parse(localStorage.getItem("departments") || "[]");
  const location = useLocation();
  const activeservice = departments.find((obj) =>
    location.pathname.includes(obj.name)
  );

  return (
    <RequireAuth>
      <div className="flex flex-col  h-full dark:bg-dark-frame-bg">
        <Topbar />
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:basis-[15%]">
            <Leftbar toggle={handleClick} style="hidden lg:flex" />
          </div>
          <div className="basis-[100%] lg:basis-[85%] md:ml-8 lg:ml-0  md:mt-8 lg:mt-0">
            <Suspense fallback={<Loader />}>
              <div className=" ">
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="/bar" element={<Dashboard />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/peaple" element={<Peaple />} />
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/products" element={<ComingSoon />} />
                  {/* super admin */}
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/requests" element={<RegistrationRequests />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route
                    path="/accountant/bar"
                    element={<BarAccountant department={activeservice} />}
                  />
                  <Route
                    path="/manager/bar"
                    element={<BarManager department={activeservice} />}
                  />
                  <Route
                    path="/manager/restaurant"
                    element={<BarAccountant department={activeservice} />}
                  />
                  <Route
                    path="/accountant/restaurant"
                    element={
                      <RestaurantAccountant department={activeservice} />
                    }
                  />
                  <Route
                    path="/employee/bar"
                    element={<BarEmployee department={activeservice} />}
                  />
                  <Route
                    path="/employee/restaurant"
                    element={<RestaurantEmployee department={activeservice} />}
                  />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
