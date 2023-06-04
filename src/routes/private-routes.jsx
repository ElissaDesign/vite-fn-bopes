/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Leftbar from "../components/left-bar";
import Topbar from "../components/top-bar";

const Company = React.lazy(() => import("../components/company"));
const Peaple = React.lazy(() => import("../private-pages/users/peaple"));
const Organizations = React.lazy(() =>
  import("../private-pages/super-admin/organizations")
);
const RegistrationRequests = React.lazy(() =>
  import("../private-pages/super-admin/company-registration-request")
);
const Dashboard = React.lazy(() => import("../private-pages/dashboard"));
const Services = React.lazy(() => import("../private-pages/admin/services"));
const Reports = React.lazy(() => import("../private-pages/reports"));
const Settings = React.lazy(() => import("../private-pages/settings"));

export default function PrivateRoutes() {
  return (
    <div>
      <Topbar />
      <div className="w-full flex items-start">
        <Leftbar />
        <div className="w-full mt-24 md:mx-16 px-4 md:px-0">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="/bar" element={<Dashboard />} />
              <Route path="/company" element={<Company />} />
              <Route path="/peaple" element={<Peaple />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/requests" element={<RegistrationRequests />} />
              <Route path="/services" element={<Services />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
