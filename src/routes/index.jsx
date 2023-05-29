/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import React, { Suspense } from "react";
import Loader from "../components/css-loader/loader";

const LandingPage = React.lazy(() => import("../public-pages/landing-page"));
const AboutPage = React.lazy(() => import("../public-pages/about-page"));
const SigninPage = React.lazy(() => import("../public-pages/signin-page"));
const SignupPage = React.lazy(() => import("../public-pages/signup-page"));

export const AppComponents = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth/login" element={<SigninPage />} />
            <Route path="/auth/register" element={<SignupPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
