/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Spinner,
} from "@chakra-ui/react";
import Button from "./button";

import { useInviteUserMutation } from "../redux/api/apiSlice";
import { errorToast, successToast } from "../hooks/toast-messages";
import { Icon } from "@iconify/react";

export default function BarProduct() {
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setrole] = useState("");

  const Role = localStorage.getItem("role");

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
              type="text"
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
              type="email"
              placeholder="Enter your email address"
              className="border h-10 px-2 py-4 border-gray text-gray outline-none rounded font-light"
              onBlur={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>

          <div>
            <p className="text-gray font-medium text-base py-2">Phone Number</p>
            <InputGroup className="dark:bg-dark-bg">
              <InputLeftAddon children="+250" className="dark:bg-dark-bg" />
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
              className="dark:bg-dark-bg"
            >
              {Role === "superadmin" ? (
                <>
                  <option value="admin" className="dark:bg-dark-bg">
                    Admin
                  </option>
                  <option value="manager">Manager</option>
                </>
              ) : (
                <>
                  <option value="manager" className="dark:bg-dark-bg">
                    Manager
                  </option>
                  <option value="accountant" className="dark:bg-dark-bg">
                    Accountant
                  </option>
                  <option value="user" className="dark:bg-dark-bg">
                    Employee
                  </option>
                </>
              )}
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
            onClick={RegisterMember}
            variant="primary"
            size="lg"
            style="mt-2 lg:mt-5 px-4 text-xl font-normal w-full "
            disabled={
              !email && !name && !phone && !role && !password ? true : false
            }
          >
            {isLoading ? <Spinner /> : "Send invitation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
