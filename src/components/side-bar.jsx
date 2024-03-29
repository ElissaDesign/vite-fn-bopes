/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  UsersIcon,
  ClipboardListIcon,
  KeyIcon,
  TemplateIcon,
  RefreshIcon,
  UserGroupIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { AcademicCapIcon, CogIcon } from "@heroicons/react/outline";
import Tooltip from "./tooltip";
import CheckRole from "../hooks/check-roles";
import SideNavLink from "./side-nav-links";
import { themeContext } from "../hooks/theme-context";
import {
  MdDarkMode,
  MdOutlineProductionQuantityLimits,
  MdSpaceDashboard,
} from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiLevelEndFlag } from "react-icons/gi";
// import { useGetAllDepartmentsUserHaveQuery } from "../redux/api/apiSlice";
import { Icon } from "@iconify/react";

function Sidebar({ style, toggle }) {
  //   const { logout } = useContext(UserContext);
  const [colorTheme, setTheme] = themeContext();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const [togglei, setTogglei] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {}, [togglei]);

  useEffect(() => {
    const interval = setInterval(() => {
      const departments = JSON.parse(localStorage.getItem("departments"));
      setDepartments(departments);
      console.log("Interval executed!");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${style} flex-col fixed h-[100%] pt-[3vh] lg:pt-[6vh] bg-[#333B90] dark:bg-dark-bg border-r p-2 text-dark-text-fill`}
    >
      <p className="my-4 mt-8 font-medium text-white-100 text-lg dark:text-white/75">
        MAIN
      </p>

      <div className="list-none pr-8">
        <SideNavLink onClick={toggle} name="Overview" to="/dashboard/">
          <MdSpaceDashboard className="w-5 mr-2 " />
        </SideNavLink>

        {/* FOR SUPER ADMINS */}
        <CheckRole roles={["superadmin"]}>
          <SideNavLink
            onClick={toggle}
            name="Customers"
            to="/dashboard/customers"
          >
            <RiCustomerService2Fill className="w-5 mr-2 " />
          </SideNavLink>

          <SideNavLink
            onClick={toggle}
            name="Products"
            to="/dashboard/products"
          >
            <MdOutlineProductionQuantityLimits className="w-5 mr-2 " />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Requests"
            to="/dashboard/requests"
          >
            <IoGitPullRequestSharp className="w-5 mr-2 " />
          </SideNavLink>

          <SideNavLink
            onClick={toggle}
            name="Statistics"
            to="/dashboard/statistics"
          >
            <GiLevelEndFlag className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>

        {/* FOR ADMINS & MANAGERS */}
        <CheckRole roles={["admin"]}>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/services"
            name="Services"
          >
            <UserGroupIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>

          <SideNavLink
            onClick={toggle}
            to="/dashboard/employees"
            name="Employees"
          >
            <UserGroupIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>

          <SideNavLink
            onClick={toggle}
            name="Statistics"
            to="/dashboard/statistics"
          >
            <GiLevelEndFlag className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>

        {/* FOR MANAGERS */}
        <CheckRole roles={["manager"]}>
          {departments?.map((department) => (
            <SideNavLink
              key={department.id} // Make sure to provide a unique key prop
              onClick={toggle}
              to={`/dashboard/manager/${department.name}`}
              name={`${department.name} Services`}
            >
              <Icon
                icon="carbon:bar"
                className="w-5 mr-2 dark:text-dark-text-fill text-lg"
              />
            </SideNavLink>
          ))}
        </CheckRole>

        {/* FOR ACCOUNTANTS */}
        <CheckRole roles={["accountant"]}>
          {departments?.map((department) => (
            <SideNavLink
              key={department.id} // Make sure to provide a unique key prop
              onClick={toggle}
              to={`/dashboard/accountant/${department.name}`}
              name={`${department.name} Services`}
            >
              <Icon
                icon="carbon:bar"
                className="w-5 mr-2 dark:text-dark-text-fill text-lg"
              />
            </SideNavLink>
          ))}
        </CheckRole>

        {/* FOR EMPLOYEES */}
        <CheckRole roles={["user"]}>
          {departments?.map((department) => (
            <SideNavLink
              key={department.id} // Make sure to provide a unique key prop
              onClick={toggle}
              to={`/dashboard/employee/${department.name}`}
              name={`${department.name} Services`}
            >
              <Icon
                icon="carbon:bar"
                className="w-5 mr-2 dark:text-dark-text-fill text-lg"
              />
            </SideNavLink>
          ))}
        </CheckRole>

        <hr className="mt-16 opacity-40" />
        <p className="my-4 font-medium text-white-100 text-lg">SUPPORT</p>

        <SideNavLink onClick={toggle} name="Settings" to="/dashboard/settings">
          <CogIcon className="w-5 mr-2" />
        </SideNavLink>
        <SideNavLink onClick={toggle} name="Help" to="/dashboard/support">
          <FiHelpCircle className="w-5 mr-2 " />
        </SideNavLink>

        <li className="inline-flex items-center text-white text-base">
          <MdDarkMode className="mr-2" />
          <span>Dark Mode</span>
          <Tooltip message="DarkMode">
            <div className="ml-2">
              <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={25}
              />
            </div>
          </Tooltip>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
