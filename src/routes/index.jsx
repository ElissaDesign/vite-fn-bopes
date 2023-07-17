/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import React, { Suspense } from "react";
import Loader from "../components/css-loader/loader";

const LandingPage = React.lazy(() => import("../public-pages/landing-page"));
const PrivateRoutes = React.lazy(() => import("../routes/private-routes"));
const PublicRoutes = React.lazy(() => import("../routes/public-routes"));
const SigninPage = React.lazy(() => import("../public-pages/signin-page"));
const SignupPage = React.lazy(() => import("../public-pages/signup-page"));

export const AppComponents = () => {
  return (
    <div className="h-[100%] flex flex-col dark:bg-dark-frame-bg">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<PrivateRoutes />} />
            <Route path="/auth/login" element={<SigninPage />} />
            <Route path="/auth/register" element={<SignupPage />} />

            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
