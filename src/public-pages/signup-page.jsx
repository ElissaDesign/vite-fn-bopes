/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useUserRegisterMutation } from "../redux/api/apiSlice";
import { registerSuccess, registerFail } from "../redux/slices/registerSlice";
import { errorToast } from "../hooks/toast-messages";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerData = useSelector((state) => state.register);

  console.log(registerData);

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newdata = await userRegister({
        name,
        email,
        password,
        phone,
      }).unwrap();
      dispatch(registerSuccess({ ...newdata }));
      navigate("/auth/login");
    } catch (error) {
      dispatch(registerFail({ ...error }));
      errorToast(registerData?.error && `${error.data.message}`);
    }
  };

  return (
    <div className="w-[90%] md:w-2/5 mx-auto mt-16">
      <div>
        <p className="text-gray-300 text-center text-lg font-semibold">
          Start for free 🌞
        </p>

        <div>
          <p className="text-gray-300 font-medium text-base py-2">Full Name</p>
          <Input
            placeholder="Full name"
            className="border h-10 px-2 py-4 border-gray text-gray text-gray-300 dark:bg-black-500 outline-none rounded font-light"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
        </div>
        <div>
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
        <div>
          <p className="text-gray-300 font-medium text-base py-2">
            Phone Number
          </p>
          <InputGroup>
            <InputLeftAddon children="+250" />
            <Input
              type="tel"
              placeholder="phone number"
              className="text-gray-300"
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>

          <br />
        </div>

        <div className="">
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
          {isLoading ? <Spinner /> : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
