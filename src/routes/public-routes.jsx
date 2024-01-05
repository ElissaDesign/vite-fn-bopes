/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/css-loader/loader";
import Navbar from "../components/navBar";
import Error from "../components/error";
import Footer from "../components/commom/MainFooter";

const LandingPage = React.lazy(() => import("../public-pages/landing-page"));
const AboutPage = React.lazy(() => import("../public-pages/about-page"));
const SigninPage = React.lazy(() => import("../public-pages/signin-page"));
const SignupPage = React.lazy(() => import("../public-pages/signup-page"));

export const PublicRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<AboutPage />} />
          <Route path="/auth/login" element={<SigninPage />} />
          <Route path="/auth/register" element={<SignupPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};
