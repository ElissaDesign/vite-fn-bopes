/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  IoDocumentTextOutline,
  IoGitPullRequestSharp,
  IoSettings,
} from "react-icons/io5";
import {
  MdOutlineMenuOpen,
  MdAutorenew,
  MdOutlineDashboard,
  MdSpaceDashboard,
  MdOutlineProductionQuantityLimits,
  MdSettingsSuggest,
  MdDarkMode,
} from "react-icons/md";

import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { GiLevelEndFlag, GiPartyPopper } from "react-icons/gi";
import { RiCustomerService2Fill, RiHotelBedFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { themeContext } from "../../hooks/theme-context";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function LeftbarSuperAdmin() {
  const [colorTheme, setTheme] = themeContext();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [open, setOpen] = useState(false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const role = localStorage.getItem("role");

  return (
    <div className="block md:hidden bg-[#333B90] dark:bg-dark-100 h-screen font-sans">
      <div className="border-r border-gray-100 dark:border-gray-100/20 overflow-y-auto">
        <div className="mx-6 my-8 ">
          <div className="inline-flex items-center text-white-300 font-medium">
            <MdAutorenew className="mr-2  text-2xl " />
            <h1 className="">MS-Apogee</h1>
          </div>

          <div className="mt-12">
            <ul>
              <p className="my-4 font-medium text-white-100 text-lg">MAIN</p>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base w-full  hover:bg-[#2B4542] py-2 rounded hover:border-l-4 border-[#37AD9A]">
                  <MdSpaceDashboard className="mr-2" />
                  <span>Overview</span>
                </li>
              </Link>
              <NavLink to="customers" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base w-full  hover:bg-[#2B4542] py-2 rounded hover:border-l-4 border-[#37AD9A]">
                  <RiCustomerService2Fill className="mr-2" />
                  <span>Customers</span>
                </li>
              </NavLink>
              <NavLink to="products" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base w-full  hover:bg-[#2B4542] py-2 rounded hover:border-l-4 border-[#37AD9A]">
                  <MdOutlineProductionQuantityLimits className="mr-2" />
                  <span>Products</span>
                </li>
              </NavLink>
              <Link to="requests" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base w-full  hover:bg-[#2B4542] py-2 rounded hover:border-l-4 border-[#37AD9A]">
                  <IoGitPullRequestSharp className="mr-2" />
                  <span>Requests</span>
                </li>
              </Link>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base w-full  hover:bg-[#2B4542] py-2 rounded hover:border-l-4 border-[#37AD9A]">
                  <GiLevelEndFlag className="mr-2" />
                  <span>Statistics</span>
                </li>
              </Link>
              <hr className="mt-20 opacity-40" />
              <p className="my-4 font-medium text-white-100 text-lg">SUPPORT</p>

              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base my-2">
                  <IoSettings className="mr-2" />
                  <span>Settings</span>
                </li>
              </Link>
              <br />
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <li className="inline-flex items-center text-white-300 text-base my-2">
                  <FiHelpCircle className="mr-2" />
                  <span>Help</span>
                </li>
              </Link>

              <li className="inline-flex items-center text-white-300 text-base my-2">
                <MdDarkMode className="mr-2" />
                <span>Dark Mode</span>
                <div className="ml-2">
                  <DarkModeSwitch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={30}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
