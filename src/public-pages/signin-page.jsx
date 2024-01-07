import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUserLoginMutation } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess } from "../redux/slices/loginSlice";
import { getProfile } from "../redux/slices/userProfileSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import AnalyisImage from "../assets/undraw_real_time_analytics_re_yliv.svg";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const loginData = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newdata = await userLogin({
        email,
        password,
      }).unwrap();
      localStorage.setItem("auth_token", newdata.data.token);
      const token = localStorage.getItem("auth_token");

      // get profile of logged user
      var config = {
        method: "get",
        url: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          const res = response.data;
          if (res.success) {
            console.log("Logged in data user:", res.data);
            dispatch(getProfile({ ...res.data }));

            if (
              res?.data.role === "creator" &&
              res?.data.organization === null
            ) {
              navigate("/startup");
            } else {
              navigate("/dashboard");
            }
          } else {
            errorToast(`${res.message}` || "fail");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      dispatch(loginFail({ ...error }));
      errorToast(
        (loginData?.error && `${error.data.message}`) || "server error"
      );
    }
  };

  return (
    <div className="dark:bg-dark-bg h-screen overflow-x-hidden ">
      <Navbar />
      <div className="flex flex-col md:flex-row mt-32 md:pl-[8%] overflow-x-hidden">
        <div className="basis-full w-[90%] md:w-full mx-auto md:basis-[40%] mb-10 md:mb-0">
          <div className="flex items-center gap-3">
            <Icon icon="logos:google-analytics" />
            <h1 className="text-gray-600 font-semibold text-lg">Data Flow</h1>
          </div>
          <p>Analyze real-time data for decision making</p>
          <div>
            <form
              class="space-y-6"
              action="#"
              method="POST"
              className="mt-6"
              onSubmit={onSubmit}>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none "
                  />
                </div>
                <div class="text-sm text-right my-2">
                  <a
                    href="/forgot-password"
                    class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? <Spinner /> : `Sign in`}
                </button>
              </div>

              <p className="text-center my-6">
                Don’t have an account ?{" "}
                <a
                  href="/auth/register"
                  class="font-semibold text-primary hover:text-indigo-500">
                  Sign up{" "}
                </a>
              </p>
            </form>
          </div>
          <hr className="my-4" />
          <p className="font-light italic text-gray-600 text-center text-base leading-relaxed">
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
            <p className="text-base">
              Empower your hospitality business with our real-time data analysis
              and decision-making system, seamlessly optimizing operations and
              enhancing guest experiences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
