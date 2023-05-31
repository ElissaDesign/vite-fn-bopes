/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Leftbar from "../components/left-bar";
import Topbar from "../components/top-bar";

const Dashboard = React.lazy(() => import("../private-pages/dashboard"));

export default function PrivateRoutes() {
  return (
    <div>
      <Topbar />
      <div className="fixed w-full flex items-start">
        <Leftbar />
        <div className="w-full mt-24 mx-16">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="/bar" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
