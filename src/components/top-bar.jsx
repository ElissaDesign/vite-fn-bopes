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
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Logo from "../assets/logo.svg";
import LogoWhite from "../assets/logoWhite.svg";

import LeftbarSuperAdmin from "./mediaQuerries/super-admin-left-bar";
import Sidebar from "./side-bar";

export default function Topbar() {
  const navigate = useNavigate();

  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

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
  const colorTheme = "dark";

  return (
    <div className="">
      <div className="w-screen h-[8vh] z-10 bg-white dark:bg-dark-bg fixed border-b">
        <div className="px-3 flex items-center w-full h-full">
          <div className="flex px-5 lg:hidden">
            <div
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}
            >
              {!nav ? (
                <MenuIcon className="w-7 dark:text-dark-text-fill" />
              ) : (
                <XIcon className="w-7 dark:text-dark-text-fill" />
              )}
            </div>
          </div>
          <div className="flex items-center h-full lg:w-full">
            <Link to="/dashboard/super-admin" className="flex flex-row lg:px-5">
              {colorTheme === "dark" ? (
                <img
                  className="w-full cursor-pointer mr-2"
                  src={Logo}
                  alt="logo"
                />
              ) : (
                <img
                  className="w-full cursor-pointer"
                  src={LogoWhite}
                  alt="logoWhite"
                />
              )}
              <h1 className="text-xl font-bold font-lexend text-primary dark:text-dark-text-fill">
                Apogee
              </h1>
            </Link>
          </div>

          <div className="inline-flex relative items-center p-0 text-sm font-medium text-center text-black  ml-auto dark:bg-dark-bg rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300   dark:focus:ring-blue-800 mr-4">
            <BellIcon
              className="w-6 cursor-pointer ml-auto  dark:text-dark-text-fill"
              // onClick={handleShowNotification}
            />
            <span className="sr-only">Notifications</span>
            {/* {notifications?.filter((item) => item.read == "false")
              .length ? (
              <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                {
                  notifications?.filter((item: any) => item.read == "false")
                    .length
                }
              </div>
            ) : (
              ""
            )} */}
          </div>

          <div className="mr-12">
            <Popover placement="top-start">
              <PopoverTrigger>
                <div
                  className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-white hover:bg-gray-200 hover:text-blue
               transition-all duration-300 cursor-pointer"
                >
                  D
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-6 dark:bg-dark-bg dark: text-dark-text-fill">
                <PopoverHeader fontWeight="semibold">
                  Elissa Design
                </PopoverHeader>
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

          {/* <div onClick={handleShowProfileDropdown}>
            <img
              className="w-8 cursor-pointer ml-4 mr-4 h-8 rounded-full"
              src={
                user?.profileImage
                  ? user?.profileImage
                  : profileData?.getProfile?.avatar
                  ? profileData?.getProfile?.avatar
                  : Avatar
              }
              alt="avatar"
            />
          </div> */}
        </div>
        <ul
          className={
            !nav
              ? "hidden"
              : "bg-white dark:bg-dark-bg cursor-pointer lg:hidden"
          }
        >
          <Sidebar toggle={handleClick} style="flex pt-2 h-[92%]" />
        </ul>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="w-screen h-[8vh] z-10 bg-white dark:bg-dark-bg fixed border-b">
  //       <div className="inline-flex items-center dark:text-dark-text-fill font-medium">
  //         <div
  //           className="block md:hidden cursor-pointer "
  //           onClick={() => setOpen(!open)}
  //         >
  //           {open ? (
  //             <AiOutlineClose className="mr-2  text-2xl transition-all duration-300 ease-in-out " />
  //           ) : (
  //             <FiMenu className="mr-2  text-2xl transition-all duration-300 ease-in-out  " />
  //           )}
  //         </div>
  //         <h1 className="md:ml-4">Dashboard</h1>
  //       </div>

  //       <div className="mr-12 flex items-center">
  //         <div className=" md:mr-24 flex flex-row items-center">
  //           <AiFillMessage className="text-2xl mr-4  text-gray-300 hover:bg-gray-100 hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
  //           <Center height="50px" className="">
  //             <Divider orientation="vertical" className="mx-4" />
  //           </Center>

  //           {/* Starting of Notifications */}

  //           <Box className="relative">
  //             <Popover placement="top-start">
  //               <PopoverTrigger>
  //                 <MdNotifications className=" z-10 text-2xl mr-4 text-gray-300 hover:bg-grey-white hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
  //               </PopoverTrigger>
  //               <PopoverContent className="mt-10" w="200px">
  //                 <PopoverHeader fontWeight="semibold">
  //                   Notifications
  //                 </PopoverHeader>
  //                 <PopoverArrow />
  //                 <PopoverCloseButton />
  //                 <PopoverBody>
  //                   Lorem ipsum dolor sit amet, consectetur adipisicing elit,
  //                   sed do eiusmod tempor incididunt ut labore et dolore.
  //                 </PopoverBody>
  //               </PopoverContent>
  //             </Popover>
  //           </Box>

  //           {/* Ending of Notifications */}

  //           <Center height="50px" className="hidden md:block">
  //             <Divider orientation="vertical" className="mx-4" />
  //           </Center>

  //           <IoIosBulb className="hidden md:block text-2xl mr-4 text-gray-300 hover:bg-gray-100 hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
  //         </div>

  //         <Popover placement="top-start">
  //           <PopoverTrigger>
  //             <div
  //               className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-white hover:bg-gray-200 hover:text-blue
  //              transition-all duration-300 cursor-pointer"
  //             >
  //               D
  //             </div>
  //           </PopoverTrigger>
  //           <PopoverContent className="p-6">
  //             <PopoverHeader fontWeight="semibold">Elissa Design</PopoverHeader>
  //             <PopoverArrow />
  //             <PopoverCloseButton />
  //             <PopoverBody>
  //               <Link
  //                 href="dashboard/settings/profile"
  //                 to="/dashboard/Personal"
  //               >
  //                 <div className="flex items-center cursor-pointer duration-300 py-4 text-grey hover:bg-grey-white">
  //                   <BsFillPersonFill className="mr-4 text-grey-light text-lg" />
  //                   <p>Personal preferences</p>
  //                 </div>
  //               </Link>

  //               <div
  //                 className={
  //                   role === "admin" || role === "boss" ? "block" : "hidden"
  //                 }
  //               >
  //                 <hr />
  //                 <div className="flex items-center cursor-pointer hover:bg-grey-white duration-300 py-4 text-grey">
  //                   <AiOutlineSetting className="mr-4 text-grey-light text-lg" />
  //                   <Link to="/dashboard/company">
  //                     {" "}
  //                     <p>Company settings</p>
  //                   </Link>
  //                 </div>
  //               </div>

  //               <hr />
  //               <div>
  //                 <div
  //                   onClick={Logout}
  //                   className="flex items-center cursor-pointer hover:bg-grey-white duration-300 py-4 text-grey"
  //                 >
  //                   <BiLogIn className="mr-4 text-grey-light text-lg" />
  //                   <p>Log out</p>
  //                 </div>
  //               </div>
  //             </PopoverBody>
  //           </PopoverContent>
  //         </Popover>
  //       </div>
  //     </div>
  //     <div
  //       className={`z-100  ${
  //         open ? "w-[80%] block" : "w-[0%] hidden"
  //       } duration-300 transition-width ease-in-out fixed`}
  //     >
  //       <LeftbarSuperAdmin />
  //     </div>
  //   </div>
  // );
}
