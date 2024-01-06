import { useState } from "react";
import { Icon } from "@iconify/react";
import { errorToast, successToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function ResetPasswordPage() {
  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return errorToast("Your password doesn't match");
    }
    setIsLoading(true);

    const data = JSON.stringify({
      password: password,
    });

    var config = {
      method: "post",
      url: `${BACKEND_URL}/auth/reset-password/${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.success) {
          setIsLoading(false);
          successToast(res.message);

          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          setIsLoading(false);
          errorToast(`${res.message}`);
        }
      })
      .catch(function (error) {
        setIsLoading(false);

        console.log(error.response);
      });
  };

  return (
    <div className="dark:bg-dark-bg h-screen overflow-x-hidden antialiased ">
      <Navbar />

      <div className="flex flex-col justify-center items-center md:flex-row mt-32 md:pl-[8%] overflow-x-hidden">
        <div className="basis-full w-[90%] md:w-full mx-auto md:basis-[40%] mb-10 md:mb-0">
          <div className="flex items-center gap-3">
            <Icon icon="logos:google-analytics" />
            <h1 className="text-gray-300 font-semibold text-lg">
              Change your password
            </h1>
          </div>

          <div>
            <form
              class="space-y-6"
              action="#"
              method="POST"
              className="mt-6"
              onSubmit={handleSubmit}>
              <div className="my-4">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-300">
                  Create new password
                </label>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    autocomplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-4">
                <label
                  for="confirm password"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Confirm your new password
                </label>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Confirm new password"
                    autocomplete="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    ` Change your password and sign in`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
