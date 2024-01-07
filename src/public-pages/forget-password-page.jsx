import { useState } from "react";
import { Icon } from "@iconify/react";
import { errorToast, successToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import AnalyisImage from "../assets/undraw_real_time_analytics_re_yliv.svg";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

export default function ForgotPasswordPage() {
  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = JSON.stringify({
      email: email,
    });

    var config = {
      method: "post",
      url: `${BACKEND_URL}/auth/forgot-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const res = response.data;
        if (res.success === true) {
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

      <div className="flex flex-col md:flex-row mt-32 md:pl-[8%] overflow-x-hidden">
        <div className="basis-full w-[90%] md:w-full mx-auto md:basis-[40%] mb-10 md:mb-0">
          <div className="flex items-center gap-3">
            <Icon icon="logos:google-analytics" />
            <h1 className="text-gray-600 font-semibold text-lg">
              Forgot your password?
            </h1>
          </div>
          <p className="mt-4">
            No problem, it happens. What’s the email address for your account?
          </p>
          <div>
            <form
              class="space-y-6"
              action="#"
              method="POST"
              className="mt-6"
              onSubmit={handleSubmit}>
              <div className="my-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Your email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    autocomplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-3">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? <Spinner /> : ` Send password reset email`}
                </button>
              </div>
            </form>
          </div>
          <hr className="my-4" />
          <p className="font-light italic text-gray-300 text-center text-base leading-relaxed">
            Revolutionize your hospitality management with our cutting-edge
            system analysis solution, providing instant insights for strategic
            decision-making and elevated guest satisfaction
          </p>
        </div>
        <div className="basis-full w-[98%] md:w-full mx-auto md:basis-[60%] relative ">
          <div className="w-full h-full">
            <img
              src={AnalyisImage}
              alt="undraw_real_time_analytics_re_yliv"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute w-[70%] bottom-0 md:bottom-52 text-left md:text-right right-0 p-3 md:p-8 text-gray-600">
            <h1 className="text-2xl font-bold">System Analysis Solution</h1>
            <hr className="my-2" />
            <p className="text-base text-gray-300">
              Empower your hospitality business with our real-time data analysis
              and decision-making system, seamlessly optimizing operations and
              enhancing guest experiences
            </p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
