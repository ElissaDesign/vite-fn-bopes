import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useUserLoginMutation } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFail, loginSuccess } from "../redux/slices/loginSlice";
import { errorToast } from "../hooks/toast-messages";

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
      localStorage.setItem("role", newdata.data.role);
      dispatch(loginSuccess({ ...newdata }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFail({ ...error }));
      errorToast(loginData?.error && `${error.data.message}`);
    }
  };

  return (
    <div className="w-[90%] md:w-2/5 mx-auto pt-20">
      <div className="mt-20">
        <p className="text-gray-300 text-center text-lg font-semibold">
          Sign in to your account 🌞
        </p>

        <div className="mt-8">
          <p className="text-gray-300 font-medium text-base py-2">
            Your email address
          </p>
          <Input
            placeholder="Enter your email address"
            className="border h-10 px-2 py-4 border-gray text-gray text-gray-300 outline-none rounded font-light"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </div>

        <div className="mt-6">
          <p className="text-gray-300 font-medium text-base pb-2">
            Your password
          </p>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              className="text-gray-300"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <br />
        </div>
        <button
          className="px-8 py-3 rounded-md bg-[#3359DF] text-white font-bold w-full"
          onClick={onSubmit}
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </div>
    </div>
  );
}
