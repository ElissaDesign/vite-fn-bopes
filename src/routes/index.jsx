/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { PublicRoutes } from "./public-routes";
// import { PrivateRoutes } from "./private-routes";
import { LandingPage } from "../public-pages/landing-page";
import Layout from "../components/layout";
import React, { Suspense } from "react";
import Loader from "../components/css-loader/loader";
import { RequireAuth } from "../hooks/require-auth";

const PublicRoutes = React.lazy(() => import("../routes/public-routes"));
const PrivateRoutes = React.lazy(() => import("../routes/private-routes"));

export const AppComponents = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<LandingPage />} />
              <Route path="/*" element={<PublicRoutes />} />

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route path="/dashboard/*" element={<PrivateRoutes />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};
