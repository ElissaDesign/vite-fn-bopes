/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Spinner,
} from "@chakra-ui/react";

import { useInviteUserMutation } from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";

export default function InviteUser() {
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setrole] = useState("");

  const RegisterMember = async (e) => {
    e.preventDefault();

    if (!email || !name || !phone || !role || !password) {
      return errorToast("Fill all required fields");
    }

    try {
      const newdata = await inviteUser({
        email,
        password,
        phone,
        name,
        role,
      }).unwrap();
      console.log("User Invitation:", newdata);
      successToast(newdata?.message || "Invitation sent");
    } catch (error) {
      console.log("Error", error);
      errorToast(error?.data.message || "Try again");
    }
  };

  return (
    <div className="">
      <div className="w-full mx-auto">
        <div>
          <div>
            <p className="text-gray font-medium text-base py-2">Full Name</p>
            <Input
              placeholder="Full name"
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setName(e.target.value)}
            />
            <br />
          </div>
          <div>
            <p className="text-gray font-medium text-base py-2">
              Your email address
            </p>
            <Input
              placeholder="Enter your email address"
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>

          <div>
            <p className="text-gray font-medium text-base py-2">Phone Number</p>
            <InputGroup>
              <InputLeftAddon children="+250" />
              <Input
                type="tel"
                placeholder="phone number"
                onBlur={(e) => setPhone(e.target.value)}
              />
            </InputGroup>

            <br />
          </div>

          <div>
            <p className="text-gray font-medium text-base pb-2">Role</p>
            <Select
              placeholder="Select role"
              defaultValue={role}
              onBlur={(e) => setrole(e.target.value)}
            >
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
              <option value="user">Employee</option>
            </Select>
            <br />
          </div>

          <div className="">
            <p className="text-gray font-medium text-base pb-2">Password</p>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
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

          <Button
            colorScheme="facebook"
            className="mt-2 w-full py-4"
            onClick={RegisterMember}
          >
            {isLoading ? <Spinner /> : "Send invitation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
