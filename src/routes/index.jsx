/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import React, { Suspense } from "react";
import Loader from "../components/css-loader/loader";
import RequireAuth from "../hooks/require-auth";

const LandingPage = React.lazy(() => import("../public-pages/landing-page"));
const PrivateRoutes = React.lazy(() => import("../routes/private-routes"));
const PublicRoutes = React.lazy(() => import("../routes/public-routes"));
const SigninPage = React.lazy(() => import("../public-pages/signin-page"));
const SignupPage = React.lazy(() => import("../public-pages/signup-page"));
const ForgotPasswordPage = React.lazy(() =>
  import("../public-pages/forget-password-page")
);
const ResetPasswordPage = React.lazy(() =>
  import("../public-pages/reset-password-page")
);
const StartUpPage = React.lazy(() => import("../public-pages/startup"));
const VerifyEmailPage = React.lazy(() =>
  import("../public-pages/verify-email-page")
);

export const AppComponents = () => {
  return (
    <div className="h-[100%] flex flex-col dark:bg-dark-frame-bg antialiased">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<PrivateRoutes />} />
            <Route path="/auth/login" element={<SigninPage />} />
            <Route path="/auth/register" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route
              path="/startup"
              element={
                <RequireAuth>
                  <StartUpPage />
                </RequireAuth>
              }
            />
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
