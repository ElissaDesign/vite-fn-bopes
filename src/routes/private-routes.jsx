/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Leftbar from "../components/left-bar";
import Topbar from "../components/top-bar";
import ComingSoon from "../components/coming-soom";

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
  return (
    <div className="w-full flex md:flex-row flex-col dark:bg-dark-frame-bg">
      <div className="hidden md:block md:basis-[13%]">
        <Leftbar />
      </div>
      <div className="md:basis-[87%] h-[100vh] overflow-scroll">
        <div className="">
          <Topbar />
        </div>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </div>
    </div>
  );
}
