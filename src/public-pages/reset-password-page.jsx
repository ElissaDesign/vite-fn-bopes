import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUserLoginMutation } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess } from "../redux/slices/loginSlice";
import { errorToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import AnalyisImage from "../assets/undraw_real_time_analytics_re_yliv.svg";
import Footer from "../components/commom/MainFooter";

export default function ResetPasswordPage() {
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
      console.log(email);

      localStorage.setItem("role", newdata.data.user.role);
      localStorage.setItem("auth_token", newdata.data.token);
      dispatch(loginSuccess({ ...newdata }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFail({ ...error }));
      errorToast(
        (loginData?.error && `${error.data.message}`) || "server error"
      );
    }
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
            <form class="space-y-6" action="#" method="POST" className="mt-6">
              <div className="my-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-300">
                  Create new password
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter new password"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Confirm your new password
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Confirm new password"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Change your password and sign in
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
