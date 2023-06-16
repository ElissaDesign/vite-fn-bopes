/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  UsersIcon,
  ClipboardCheckIcon,
  TrendingUpIcon,
  ClipboardListIcon,
  KeyIcon,
  TemplateIcon,
  RefreshIcon,
  UserGroupIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CogIcon,
} from "@heroicons/react/outline";
import Tooltip from "./tooltip";
import CheckRole from "../hooks/check-roles";
import SideNavLink from "./side-nav-links";
import { themeContext } from "../hooks/theme-context";
import {
  MdAutorenew,
  MdDarkMode,
  MdOutlineProductionQuantityLimits,
  MdSpaceDashboard,
} from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiLevelEndFlag } from "react-icons/gi";

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
  useEffect(() => {}, [togglei]);
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

        {/* FOR ADMINS & COORDINATORS */}
        <CheckRole roles={["admin", "coordinator"]}>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/trainees"
            name="Trainees"
          >
            <UserGroupIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>

        {/* FOR ADMINS */}
        <CheckRole roles={["admin"]}>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/coordinators"
            name="Coordinators"
          >
            <UsersIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} to="/dashboard/teams" name="Teams">
            <UserGroupIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} to="/dashboard/cohorts" name="Cohorts">
            <AcademicCapIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} to="/dashboard/phases" name="Phases">
            <MoonIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/programs"
            name="Programs"
          >
            {/* <ProgramIcon className="w-5 mr-2 dark:text-dark-text-fill" /> */}
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/admin/ratings"
            name="Ratings"
          >
            <ClipboardListIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/updated-ratings"
            name="Updated Ratings"
          >
            <RefreshIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/grading"
            name="Grading System"
          >
            <TemplateIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/manage"
            name="Roles & Access"
          >
            <KeyIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
        </CheckRole>

        {/* FOR COORDINATORS */}
        <CheckRole roles={["coordinator"]}>
          <SideNavLink
            onClick={toggle}
            to="/dashboard/sessions"
            name="Sessions"
          >
            <BookOpenIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink onClick={toggle} to="/dashboard/ratings" name="Ratings">
            <ClipboardListIcon className="w-5 mr-2 dark:text-dark-text-fill" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Attendance"
            to="/dashboard/attendance-rating"
          >
            <ClipboardCheckIcon className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>

        {/* FOR TRAINEES */}
        <CheckRole roles={["trainee"]}>
          <SideNavLink
            onClick={toggle}
            name="Attendance"
            to="/dashboard/attendance"
          >
            <ClipboardCheckIcon className="w-5 mr-2 " />
          </SideNavLink>
          <SideNavLink
            onClick={() => {
              toggle();
              setTogglei(true);
            }}
            name="Performance"
            to="/dashboard/performance"
          >
            <TrendingUpIcon className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>

        <hr className="mt-16 opacity-40" />
        <p className="my-4 font-medium text-white-100 text-lg">SUPPORT</p>

        <SideNavLink onClick={toggle} name="Settings" to="/dashboard/settings">
          <CogIcon className="w-5 mr-2" />
        </SideNavLink>
        <SideNavLink onClick={toggle} name="Help" to="/dashboard/support">
          <FiHelpCircle className="w-5 mr-2 " />
        </SideNavLink>

        <li className="inline-flex items-center text-white text-base my-2">
          <MdDarkMode className="mr-2" />
          <span>Dark Mode</span>
          <Tooltip message="DarkMode">
            <div className="ml-2">
              <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
          </Tooltip>
        </li>

        {/* Add icons */}
        <div className="flex flex-row ml-10 mt-auto list-none">
          <li className="px-2">
            <NavLink to="#link">
              {/* <Tooltip message="Logout">
                <LogoutIcon
                  onClick={logout}
                  className="w-5 text-red-700 dark:text-red-600 hover:text-red-900"
                />
              </Tooltip> */}
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/dashboard/settings"
              className={(navData) => {
                if (navData.isActive) {
                  return "flex flex-row font-bold text-primary dark:text-primary";
                }
                return "flex flex-row dark:text-dark-text-fill";
              }}
            >
              <Tooltip message="Settings">
                <CogIcon className="w-5 hover:text-primary " onClick={toggle} />
              </Tooltip>
            </NavLink>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
