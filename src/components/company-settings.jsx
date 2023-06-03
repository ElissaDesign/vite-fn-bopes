import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
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
import { AiOutlineSetting, AiFillMessage } from "react-icons/ai";
import { IoIosBulb } from "react-icons/io";

function Topbar() {
  const role = "admin";

  return (
    <div>
      <div className="fixed top-0 left-0 z-10 w-full shadow h-20 flex-1 flex items-center justify-between bg-white">
        <div className="pl-12 flex items-center">Logo</div>

        <div className="mr-12 flex items-center">
          <div className="mr-24 flex items-center">
            <AiFillMessage className="text-2xl mr-4  text-grey-light hover:bg-grey-white hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
            <Center height="50px">
              <Divider orientation="vertical" className="mx-4" />
            </Center>

            {/* Starting of Notifications */}

            <Box className="relative">
              <Popover placement="top-start">
                <PopoverTrigger>
                  <MdNotifications className=" z-10 text-2xl mr-4 text-grey-light hover:bg-grey-white hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
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

            <Center height="50px">
              <Divider orientation="vertical" className="mx-4" />
            </Center>

            <IoIosBulb className="text-2xl mr-4 text-grey-light hover:bg-grey-white hover:p-2 hover:rounded-full transition-all duration-300 cursor-pointer" />
          </div>

          <Popover placement="top-start">
            <PopoverTrigger>
              <div className="w-8 h-8 bg-grey-light rounded-full flex justify-center items-center text-white hover:bg-grey-white hover:text-primary transition-all duration-300 cursor-pointer">
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
                  <div className="flex items-center cursor-pointer hover:bg-grey-white duration-300 py-4 text-grey">
                    <BiLogIn className="mr-4 text-grey-light text-lg" />
                    <p>Log out</p>
                  </div>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
