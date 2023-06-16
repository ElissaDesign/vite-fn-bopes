/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

// superadmin links
const Customers = React.lazy(() =>
  import("../private-pages/super-admin/customers")
);

export default function PrivateRoutes() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <RequireAuth>
      <div className="flex flex-col  min-h-screen dark:bg-dark-frame-bg">
        <Topbar />
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:basis-[15%]">
            <Leftbar toggle={handleClick} style="hidden lg:flex" />
          </div>
          <div className="basis-[100%] lg:basis-[85%] md:ml-8 lg:ml-0 ">
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
