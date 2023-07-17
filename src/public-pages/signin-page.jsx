import { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Button from "../components/button";
import { useUserLoginMutation } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess } from "../redux/slices/loginSlice";
import { errorToast } from "../hooks/toast-messages";
import Navbar from "../components/navBar";
import { BsFillEnvelopeAtFill } from "react-icons/bs";

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
    <div className="dark:bg-dark-bg h-screen">
      <Navbar />

      <div className="w-[90%] md:w-2/5 mx-auto mt-32 dark:bg-dark-bg dark:text-dark-text-fill bg-white border p-8 rounded shadow-lg">
        <div className="">
          <p className="text-gray-800 dark:text-dark-text-fill text-center text-lg font-semibold">
            Sign in to your account 🌞
          </p>

          <div className="mt-8 ">
            <p className="text-gray-800 dark:text-dark-text-fill font-medium text-base py-2">
              Your email address
            </p>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BsFillEnvelopeAtFill color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <br />
          </div>

          <div className="mt-4">
            <p className="text-gray-800 dark:text-dark-text-fill font-medium text-base pb-2">
              Your password
            </p>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                className="text-gray-700 dark:text-dark-text-fill"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  style="text-xl w-full text-sm flex items-center justify-center"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? <Icon icon="mdi:hide" /> : <Icon icon="mdi:show" />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <br />
          </div>
          <Button
            style="text-xl w-full text-sm flex items-center justify-center"
            size="lg"
            onClick={onSubmit}
          >
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
