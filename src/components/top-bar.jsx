/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { MdAutorenew, MdNotifications } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Center,
  Box,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import {
  AiOutlineSetting,
  AiFillMessage,
  AiOutlineClose,
} from "react-icons/ai";
import { IoIosBulb } from "react-icons/io";
import { useNavigate } from "react-router";
import { useSignOutMutation } from "../redux/api/apiSlice";
import { errorToast } from "../hooks/toast-messages";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import LeftbarSuperAdmin from "./mediaQuerries/super-admin-left-bar";

export default function Topbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [signOut] = useSignOutMutation();

  // Not working this needs to be fixed
  const Logout = async (e) => {
    e.preventDefault();
    try {
      const signout = await signOut();
      navigate("/auth/login");
      console.log(signout);
    } catch (error) {
      console.log(error);
      errorToast("Failed to sign out");
    }
    navigate("/");
  };

  const role = "admin";

  return (
    <div>
      <div className="dark:bg-dark-bg font-sans top-0 sticky shadow h-14 md:h-20 flex-1 flex flex-row items-center justify-between bg-white-300 dark:bg-dark-300 border-b border-gray-100 dark:border-gray-100/20">
        <div className="inline-flex items-center dark:text-dark-text-fill font-medium">
          <div
            className="block md:hidden cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <AiOutlineClose className="mr-2  text-2xl transition-all duration-300 ease-in-out " />
            ) : (
              <FiMenu className="mr-2  text-2xl transition-all duration-300 ease-in-out  " />
            )}
          </div>
          <h1 className="md:ml-4">Dashboard</h1>
        </div>

        <div className="mr-12 flex items-center">
          <div className=" md:mr-24 flex flex-row items-center">
            <AiFillMessage className="text-2xl mr-4  text-gray-300 hover:bg-gray-100 hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
            <Center height="50px" className="">
              <Divider orientation="vertical" className="mx-4" />
            </Center>

            {/* Starting of Notifications */}

            <Box className="relative">
              <Popover placement="top-start">
                <PopoverTrigger>
                  <MdNotifications className=" z-10 text-2xl mr-4 text-gray-300 hover:bg-grey-white hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="mt-10" w="200px">
                  <PopoverHeader fontWeight="semibold">
                    Notifications
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>

            {/* Ending of Notifications */}

            <Center height="50px" className="hidden md:block">
              <Divider orientation="vertical" className="mx-4" />
            </Center>

            <IoIosBulb className="hidden md:block text-2xl mr-4 text-gray-300 hover:bg-gray-100 hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
          </div>

          <Popover placement="top-start">
            <PopoverTrigger>
              <div
                className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-white hover:bg-gray-200 hover:text-blue
               transition-all duration-300 cursor-pointer"
              >
                D
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-6">
              <PopoverHeader fontWeight="semibold">Elissa Design</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Link
                  href="dashboard/settings/profile"
                  to="/dashboard/Personal"
                >
                  <div className="flex items-center cursor-pointer duration-300 py-4 text-grey hover:bg-grey-white">
                    <BsFillPersonFill className="mr-4 text-grey-light text-lg" />
                    <p>Personal preferences</p>
                  </div>
                </Link>

                <div
                  className={
                    role === "admin" || role === "boss" ? "block" : "hidden"
                  }
                >
                  <hr />
                  <div className="flex items-center cursor-pointer hover:bg-grey-white duration-300 py-4 text-grey">
                    <AiOutlineSetting className="mr-4 text-grey-light text-lg" />
                    <Link to="/dashboard/company">
                      {" "}
                      <p>Company settings</p>
                    </Link>
                  </div>
                </div>

                <hr />
                <div>
                  <div
                    onClick={Logout}
                    className="flex items-center cursor-pointer hover:bg-grey-white duration-300 py-4 text-grey"
                  >
                    <BiLogIn className="mr-4 text-grey-light text-lg" />
                    <p>Log out</p>
                  </div>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div
        className={`z-100  ${
          open ? "w-[80%] block" : "w-[0%] hidden"
        } duration-300 transition-width ease-in-out fixed`}
      >
        <LeftbarSuperAdmin />
      </div>
    </div>
  );
}
