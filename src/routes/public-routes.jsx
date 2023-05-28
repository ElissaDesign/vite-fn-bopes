/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Navbar from "../components/navBar";

const AboutPage = React.lazy(() => import("../public-pages/about-page"));
const SigninPage = React.lazy(() => import("../public-pages/signin-page"));
const SignupPage = React.lazy(() => import("../public-pages/signup-page"));

export const PublicRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className="fixed w-full flex items-start">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/pricing" element={<AboutPage />} />
            <Route path="auth/login" element={<SigninPage />} />
            <Route path="auth/register" element={<SignupPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
